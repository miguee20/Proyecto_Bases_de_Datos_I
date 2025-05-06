let productosAgregados = [];

function obtenerToken() {
  return localStorage.getItem("token");
}

// Cargar clientes

function cargarClientes() {
  fetch("/api/clientes", {
    headers: {
      Authorization: `Bearer ${obtenerToken()}`
    }
  })
    .then(res => res.json())
    .then(clientes => {
      const selector = document.getElementById("clienteSeleccionado");
      selector.innerHTML = "";
      clientes.forEach(c => {
        const opcion = document.createElement("option");
        opcion.value = c.id_cliente;
        opcion.textContent = `${c.nombre} ${c.apellido} - ${c.nit}`;
        selector.appendChild(opcion);
      });
    })
    .catch(err => console.error("Error cargando clientes:", err));
}

// Cargar productos
function cargarProductos() {
  fetch("/api/productos", {
    headers: {
      Authorization: `Bearer ${obtenerToken()}`
    }
  })
    .then(res => res.json())
    .then(productos => {
      const selector = document.getElementById("productoSeleccionado");
      selector.innerHTML = "";
      productos.forEach(p => {
        const opcion = document.createElement("option");
        opcion.value = p.id_producto;
        opcion.textContent = `${p.nombre} (${p.stock} disponibles)`;
        opcion.dataset.precio = p.precio;
        selector.appendChild(opcion);
      });

      selector.addEventListener("change", () => {
        const precio = selector.selectedOptions[0].dataset.precio;
        document.getElementById("precioProducto").value = precio;
      });

      selector.dispatchEvent(new Event("change"));
    })
    .catch(err => console.error("Error cargando productos:", err));
}

// Cargar empleados
function cargarEmpleados() {
  fetch("/api/empleados", {
    headers: {
      Authorization: `Bearer ${obtenerToken()}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const selector = document.getElementById("empleadoSeleccionado");
      selector.innerHTML = "";
      data.forEach(emp => {
        const opcion = document.createElement("option");
        opcion.value = emp.id_empleado;
        opcion.textContent = `${emp.nombre} ${emp.apellido}`;
        selector.appendChild(opcion);
      });
    })
    .catch(err => console.error("Error cargando empleados:", err));
}

// Cargar sucursales
function cargarSucursales() {
  fetch("/api/sucursales", {
    headers: {
      Authorization: `Bearer ${obtenerToken()}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const selector = document.getElementById("sucursalSeleccionada");
      selector.innerHTML = "";
      data.forEach(suc => {
        const opcion = document.createElement("option");
        opcion.value = suc.id_sucursal;
        opcion.textContent = suc.nombre;
        selector.appendChild(opcion);
      });
    })
    .catch(err => console.error("Error cargando sucursales:", err));
}

// Cargar métodos de pago
function cargarMetodosPago() {
  fetch("/api/metodos_pago", {
    headers: {
      Authorization: `Bearer ${obtenerToken()}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const selector = document.getElementById("metodoPagoSeleccionado");
      selector.innerHTML = "";
      data.forEach(m => {
        const opcion = document.createElement("option");
        opcion.value = m.id_metodo_pago;
        opcion.textContent = m.tipo_pago;
        selector.appendChild(opcion);
      });
    })
    .catch(err => console.error("Error cargando métodos de pago:", err));
}

// Agregar producto a la venta
function agregarProductoAVenta() {
  const productoId = document.getElementById("productoSeleccionado").value;
  const productoNombre = document.getElementById("productoSeleccionado").selectedOptions[0].textContent;
  const cantidad = parseInt(document.getElementById("cantidadProducto").value);
  const precio = parseFloat(document.getElementById("precioProducto").value);
  const subtotal = cantidad * precio;

  if (!productoId || !cantidad || !precio) {
    alert("Debes completar todos los campos del producto");
    return;
  }

  productosAgregados.push({
    id_producto: productoId,
    nombre: productoNombre,
    cantidad: cantidad,
    precio: precio,
    subtotal: subtotal
  });

  actualizarTablaProductos();
  actualizarTotal();
}

// Actualizar tabla de productos agregados
function actualizarTablaProductos() {
  const tbody = document.querySelector("#tablaProductosVenta tbody");
  tbody.innerHTML = "";

  productosAgregados.forEach((p, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.cantidad}</td>
      <td>Q${p.precio.toFixed(2)}</td>
      <td>Q${p.subtotal.toFixed(2)}</td>
      <td><button onclick="eliminarProducto(${index})">❌</button></td>
    `;
    tbody.appendChild(fila);
  });
}

// Eliminar producto
function eliminarProducto(index) {
  productosAgregados.splice(index, 1);
  actualizarTablaProductos();
  actualizarTotal();
}

// Calcular total
function actualizarTotal() {
  const total = productosAgregados.reduce((sum, p) => sum + p.subtotal, 0);
  document.getElementById("totalVenta").textContent = total.toFixed(2);
}

// Registrar venta
function registrarVenta() {
  if (productosAgregados.length === 0) {
    alert("No se han agregado productos a la venta");
    return;
  }

  const datosVenta = {
    fecha: document.getElementById("fechaVenta").value,
    id_cliente: document.getElementById("clienteSeleccionado").value,
    id_empleado: document.getElementById("empleadoSeleccionado").value,
    id_sucursal: document.getElementById("sucursalSeleccionada").value,
    id_metodo_pago: document.getElementById("metodoPagoSeleccionado").value,
    total: productosAgregados.reduce((sum, p) => sum + p.subtotal, 0),
    productos: productosAgregados
  };

  fetch("/api/ventas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${obtenerToken()}`
    },
    body: JSON.stringify(datosVenta)
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al registrar la venta");
      return res.json();
    })
    .then(data => {
      alert("Venta registrada con éxito");
      productosAgregados = [];
      actualizarTablaProductos();
      actualizarTotal();
    })
    .catch(error => alert("Error: " + error.message));
}

// Mostrar sección ventas
function ocultarTodasLasSecciones() {
  document.getElementById('bienvenida').style.display = 'none';
  document.getElementById('seccion-productos').style.display = 'none';
  document.getElementById('seccion-clientes').style.display = 'none';
  document.getElementById('seccion-proveedores').style.display = 'none';
  document.getElementById('seccion-compras').style.display = 'none';
  document.getElementById('seccion-ventas').style.display = 'none';
  // Agrega más secciones si las tienes (ventas, reportes, etc.)
}
function mostrarSeccionVentas() {
  ocultarTodasLasSecciones(); // <-- Oculta todo antes de mostrar
  document.getElementById('seccion-ventas').style.display = 'block';
  productosAgregados = [];
  actualizarTablaProductos();
  actualizarTotal();

  cargarClientes();
  cargarProductos();
  cargarEmpleados();
  cargarSucursales();
  cargarMetodosPago();
  document.getElementById("fechaVenta").valueAsDate = new Date();
}

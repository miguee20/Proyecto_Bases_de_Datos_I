let productosVenta = [];

function agregarProductoAVenta() {
  const id_producto = document.getElementById('productoVenta').value;
  const nombreProducto = document.getElementById('productoVenta').selectedOptions[0].text;
  const cantidad = parseInt(document.getElementById('cantidadVenta').value);
  const precio = parseFloat(document.getElementById('productoVenta').selectedOptions[0].getAttribute('data-precio'));

  if (!id_producto || isNaN(cantidad) || cantidad <= 0 || isNaN(precio)) {
    return alert('Complete correctamente los campos del producto');
  }

  const subtotal = cantidad * precio;

  productosVenta.push({
    id_producto: parseInt(id_producto),
    nombre: nombreProducto,
    cantidad,
    precio_unitario: precio,
    subtotal
  });

  mostrarProductosVenta();
  document.getElementById('cantidadVenta').value = '';
}

function mostrarProductosVenta() {
  const tbody = document.getElementById('detalle-venta-body');
  tbody.innerHTML = '';

  productosVenta.forEach((prod, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${prod.nombre}</td>
      <td>${prod.cantidad}</td>
      <td>Q${prod.precio_unitario.toFixed(2)}</td>
      <td>Q${prod.subtotal.toFixed(2)}</td>
      <td><button onclick="eliminarProducto(${index})" style="color: red;">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function eliminarProducto(index) {
  productosVenta.splice(index, 1);
  mostrarProductosVenta();
}

function guardarVenta() {
  const id_cliente = document.getElementById('clienteVenta').value;
  const id_producto = document.getElementById('productoVenta').value;
  const precio_unitario = parseFloat(document.getElementById('precioVenta').value);
  const cantidad = parseInt(document.getElementById('cantidadVenta').value);

  if (!id_cliente) {
    alert('Seleccione un cliente');
    return;
  }
  if (!id_producto) {
    alert('Seleccione un producto');
    return;
  }
  if (!cantidad || cantidad <= 0) {
    alert('Ingrese una cantidad válida');
    return;
  }

  const token = localStorage.getItem('token');

  const productoSeleccionado = {
    id_producto: parseInt(id_producto),
    cantidad: cantidad,
    precio_unitario: precio_unitario
  };

  const productosVenta = [productoSeleccionado];

  fetch('http://localhost:5000/api/ventas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      id_cliente,
      productos: productosVenta
    })
  })
  .then(res => {
    if (!res.ok) {
      return res.text().then(text => {
        console.error('Error del servidor:', text);
        throw new Error('Error al registrar la venta');
      });
    }
    return res.json();
  })
  .then(data => {
    alert('Venta registrada con éxito');
    // Limpieza de campos
    document.getElementById('productoVenta').value = '';
    document.getElementById('cantidadVenta').value = '';
    document.getElementById('precioVenta').value = '';
    cargarVentas();
  })
  .catch(error => {
    console.error(error);
    alert('Error al registrar la venta: ' + error.message);
  });
}

function limpiarFormularioVenta() {
  productosVenta = [];
  mostrarProductosVenta();
  document.getElementById('clienteVenta').value = '';
  document.getElementById('productoVenta').value = '';
  document.getElementById('cantidadVenta').value = '';
  document.getElementById('fechaVenta').value = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const btnAgregar = document.querySelector('button[onclick="agregarProductoAVenta()"]');
  if (btnAgregar) btnAgregar.addEventListener('click', agregarProductoAVenta);

  const btnRegistrar = document.getElementById('btnRegistrarVenta');
  if (btnRegistrar) btnRegistrar.addEventListener('click', e => {
    e.preventDefault();
    guardarVenta();
  });
});

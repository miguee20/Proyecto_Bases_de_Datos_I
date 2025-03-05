document.addEventListener("DOMContentLoaded", () => { 
    const productosContainer = document.getElementById("productos-container");
    const agregarModal = document.getElementById("agregar-modal");
    const agregarForm = document.getElementById("agregar-form");

    // Función para cargar productos desde la API
    function cargarProductos() {
        fetch("http://localhost:5000/productos")
            .then(response => response.json())
            .then(productos => {
                productosContainer.innerHTML = "";
                productos.forEach(producto => {
                    const productoElemento = document.createElement("div");
                    productoElemento.classList.add("producto-item");
                    productoElemento.innerHTML = `
                        <p><strong>${producto.nombre}</strong> - ${producto.descripcion} - 
                        <span class="precio">Q${producto.precio}</span> - Cantidad: ${producto.cantidad}</p>
                        <button class="editar-btn" onclick="editarProducto(${producto.id}, '${producto.nombre}', '${producto.descripcion}', ${producto.precio}, ${producto.cantidad})">✏️ Editar</button>
                        <button class="eliminar-btn" onclick="eliminarProducto(${producto.id})">🗑️ Eliminar</button>
                    `;
                    productosContainer.appendChild(productoElemento);
                });
            })
            .catch(error => console.error("Error al obtener productos:", error));
    }

    cargarProductos(); // Cargar productos al inicio

    // Función para eliminar productos
    window.eliminarProducto = function (id) {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
            fetch(`http://localhost:5000/productos/${id}`, { method: "DELETE" })
                .then(response => response.json())
                .then(data => {
                    alert(data.mensaje);
                    cargarProductos();
                })
                .catch(error => console.error("Error al eliminar producto:", error));
        }
    };

    // Función para abrir el modal de edición
    window.editarProducto = function (id, nombre, descripcion, precio, cantidad) {
        document.getElementById("edit-id").value = id;
        document.getElementById("edit-nombre").value = nombre;
        document.getElementById("edit-descripcion").value = descripcion;
        document.getElementById("edit-precio").value = precio;
        document.getElementById("edit-cantidad").value = cantidad;
        document.getElementById("edit-modal").style.display = "block";
    };

    // Función para cerrar modales
    window.cerrarModal = function (modalId) {
        document.getElementById(modalId).style.display = "none";
    };

    // Función para guardar cambios en un producto (Edición)
    document.getElementById("edit-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const id = document.getElementById("edit-id").value;
        const nombre = document.getElementById("edit-nombre").value;
        const descripcion = document.getElementById("edit-descripcion").value;
        const precio = document.getElementById("edit-precio").value;
        const cantidad = document.getElementById("edit-cantidad").value;

        fetch(`http://localhost:5000/productos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, descripcion, precio, cantidad })
        })
            .then(response => response.json())
            .then(data => {
                cerrarModal("edit-modal");
                alert(data.mensaje); // Mostramos la alerta de éxito
                cargarProductos();
            })
            .catch(error => console.error("Error al actualizar producto:", error));
    });

    // 🆕 Función para abrir el modal de agregar productos
    window.abrirAgregarModal = function () {
        document.getElementById("agregar-modal").style.display = "block";
    };

    // 🆕 Función para agregar productos con alerta y cierre automático
    agregarForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("agregar-nombre").value.trim();
        const descripcion = document.getElementById("agregar-descripcion").value.trim();
        const precio = parseFloat(document.getElementById("agregar-precio").value);
        const cantidad = parseInt(document.getElementById("agregar-cantidad").value, 10);

        if (!nombre || !descripcion || isNaN(precio) || isNaN(cantidad)) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        fetch("http://localhost:5000/productos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, descripcion, precio, cantidad })
        })
            .then(response => response.json())
            .then(data => {
                cerrarModal("agregar-modal"); // Cierra el modal
                alert(data.mensaje); // Muestra mensaje de éxito
                agregarForm.reset(); // Limpia el formulario
                cargarProductos(); // Recarga la lista
            })
            .catch(error => console.error("Error al agregar producto:", error));
    });
});

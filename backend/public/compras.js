document.addEventListener('DOMContentLoaded', () => {
    agregarEventListeners(); // Si necesitas agregar eventos específicos
});

window.onload = async () => {
    const token = localStorage.getItem('token');
    const nombre = localStorage.getItem('nombre_usuario');

    if (!token) {
        alert('No estás logueado');
        return window.location.href = 'login.html';
    }

    try {
        const response = await fetch('/api/verify-session', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!data.isAuthenticated || data.rol !== 'admin') {
            alert('Acceso no autorizado.');
            return window.location.href = 'login.html';
        }

        const nombreUsuario = nombre || 'Admin';
        document.getElementById('nombreUsuario').innerText = nombreUsuario;
        document.getElementById('mensajeBienvenida').innerText = `¡Bienvenido(a), ${nombreUsuario}!`;

    } catch (error) {
        console.error('Error al verificar sesión:', error);
        alert('Error al verificar la sesión.');
        window.location.href = 'login.html';
    }
};

// COMPRAS
function ocultarTodasLasSecciones() {
    document.getElementById('bienvenida').style.display = 'none';
    document.getElementById('seccion-productos').style.display = 'none';
    document.getElementById('seccion-clientes').style.display = 'none';
    document.getElementById('seccion-proveedores').style.display = 'none';
    document.getElementById('seccion-compras').style.display = 'none';
    document.getElementById('seccion-ventas').style.display = 'none';
    // Agrega más secciones si las tienes (ventas, reportes, etc.)
}
function mostrarSeccionCompras() {
    ocultarTodasLasSecciones(); // <-- Oculta todo antes de mostrar
    document.getElementById('seccion-compras').style.display = 'block';
    cargarCompras();
}

function cargarCompras() {
    const token = localStorage.getItem('token');
    fetch('/api/compras', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then(res => res.json())
    .then(compras => {
        const contenedor = document.getElementById('lista-compras');
        contenedor.innerHTML = '';

        compras.forEach(c => {
            const item = document.createElement('div');
            item.className = 'compra-card';
            item.innerHTML = `
                <div>
                    <h4 style="margin: 0;">${c.producto}</h4>
                    <p style="margin: 5px 0;"><strong>Proveedor:</strong> ${c.proveedor}</p>
                    <p style="margin: 5px 0;"><strong>Cantidad:</strong> ${c.cantidad} | <strong>Fecha:</strong> ${c.fecha}</p>
                </div>
                <div>
                    <button onclick="mostrarModalEdicionCompra(${c.id_compra})">Editar</button>
                    <button onclick="eliminarCompra(${c.id_compra})">Eliminar</button>
                </div>
            `;
            contenedor.appendChild(item);
        });
    });
}

function mostrarFormularioCompra() {
    document.getElementById('editModalCompra').style.display = 'flex';
    document.getElementById('formCompra').reset();
    document.getElementById('editCompraId').value = '';
}

function cerrarModalCompra() {
    document.getElementById('editModalCompra').style.display = 'none';
}

// Asegurarse de agregar el eventListener solo después de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const formCompra = document.getElementById('formCompra');
    if (formCompra) {
        formCompra.addEventListener('submit', async function(e) {
            e.preventDefault();

            const id = document.getElementById('editCompraId').value;
            const producto = document.getElementById('editProductoCompra').value;
            const proveedor = document.getElementById('editProveedorCompra').value;
            const cantidad = document.getElementById('editCantidadCompra').value;
            const fecha = document.getElementById('editFechaCompra').value;

            const token = localStorage.getItem('token');
            const url = id ? `/api/compras/${id}` : '/api/compras';
            const method = id ? 'PUT' : 'POST';

            try {
                const res = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ producto, proveedor, cantidad, fecha })
                });

                if (res.ok) {
                    alert('Compra guardada');
                    cargarCompras();
                    cerrarModalCompra();
                } else {
                    const error = await res.json();
                    alert('Error: ' + error.message);
                }
            } catch (error) {
                alert('Error en la solicitud');
            }
        });
    } else {
        console.error('Formulario de compra no encontrado');
    }
});

// Mostrar modal de edición de compra
function mostrarModalEdicionCompra(id) {
    const token = localStorage.getItem('token');
    fetch(`/api/compras/${id}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then(res => res.json())
    .then(compra => {
        document.getElementById('editCompraId').value = compra.id_compra;
        document.getElementById('editProductoCompra').value = compra.producto;
        document.getElementById('editProveedorCompra').value = compra.proveedor;
        document.getElementById('editCantidadCompra').value = compra.cantidad;
        document.getElementById('editFechaCompra').value = compra.fecha;

        document.getElementById('editModalCompra').style.display = 'flex';
    });
}

function eliminarCompra(id) {
    const token = localStorage.getItem('token');
    if (!confirm("¿Estás seguro de eliminar esta compra?")) return;

    fetch(`/api/compras/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then(res => {
        if (res.ok) {
            alert('Compra eliminada');
            cargarCompras();
        } else {
            alert('Error al eliminar la compra');
        }
    });
}


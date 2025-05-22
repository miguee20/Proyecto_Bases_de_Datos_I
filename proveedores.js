//document.addEventListener('DOMContentLoaded', () => {
    // Agregar event listeners después de que el DOM esté completamente cargado
    //agregarEventListeners();
//});

// Agregar el event listener para el formulario
function agregarEventListeners() {
    const formEditProveedor = document.getElementById('formEditProveedor');
    if (formEditProveedor) {
        formEditProveedor.addEventListener('submit', async function(e) {
            e.preventDefault();

            const id_proveedor = this.getAttribute('data-id');
            const token = localStorage.getItem('token');

            const proveedor = {
                nombre: document.getElementById('nombreProveedor').value,
                contacto: document.getElementById('contactoProveedor').value,
                telefono: document.getElementById('telefonoProveedor').value,
                email: document.getElementById('emailProveedor').value,
                direccion: document.getElementById('direccionProveedor').value
            };

            const url = id_proveedor ? `http://localhost:5000/api/proveedores/${id_proveedor}` : 'http://localhost:5000/api/proveedores';
            const method = id_proveedor ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(proveedor)
            });

            if (res.ok) {
                alert('Proveedor guardado exitosamente');
                cargarProveedores();
                cerrarModalProveedor();
            } else {
                const error = await res.json();
                alert('Error: ' + (error.message || 'No se pudo guardar el proveedor.'));
            }
        });
    } else {
        console.log('Formulario no encontrado');
    }
}

// Mostrar sección proveedores
function ocultarTodasLasSecciones() {
    document.getElementById('bienvenida').style.display = 'none';
    document.getElementById('seccion-productos').style.display = 'none';
    document.getElementById('seccion-clientes').style.display = 'none';
    document.getElementById('seccion-proveedores').style.display = 'none';
    document.getElementById('seccion-compras').style.display = 'none';
    document.getElementById('seccion-ventas').style.display = 'none';
    // Agrega más secciones si las tienes (ventas, reportes, etc.)
}

function mostrarSeccionProveedores() {
    ocultarTodasLasSecciones(); // <-- Oculta todo antes de mostrar
    document.getElementById('seccion-proveedores').style.display = 'block';
    cargarProveedores();
}

// Cargar proveedores
async function cargarProveedores() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/proveedores', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    const proveedores = await response.json();
    const contenedor = document.getElementById('lista-proveedores');
    contenedor.innerHTML = '';  // Limpiar la lista de proveedores

    proveedores.forEach(proveedor => {
        const card = document.createElement('div');
        card.className = 'card-proveedor';
        card.style = `
            background:rgba(229, 215, 215, 0.2);
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 10px;
            box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
        `;
        card.innerHTML = `
            <h4>${proveedor.nombre}</h4>
            <p><strong>Contacto:</strong> ${proveedor.contacto}</p>
            <p><strong>Teléfono:</strong> ${proveedor.telefono}</p>
            <p><strong>Email:</strong> ${proveedor.email}</p>
            <p><strong>Dirección:</strong> ${proveedor.direccion}</p>
            <div style="margin-top: 10px;">
                <button onclick="mostrarFormularioEditarProveedor(${proveedor.id_proveedor})" style="background-color: #e2a5d9; border: none; padding: 8px; border-radius: 5px; color: white;">Editar</button>
                <button onclick="eliminarProveedor(${proveedor.id_proveedor})" style="background-color: #f0b0b0; border: none; padding: 8px; border-radius: 5px; color: white; margin-left: 10px;">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// Mostrar formulario de agregar proveedor
function mostrarFormularioProveedor() {
    document.getElementById('tituloModalProveedor').innerText = 'Agregar Proveedor';
    document.getElementById('formulario-editar-proveedor').style.display = 'flex';
    document.getElementById('formEditProveedor').reset();
    document.getElementById('formEditProveedor').setAttribute('data-id', '');
}

// Mostrar formulario de editar proveedor
async function mostrarFormularioEditarProveedor(id_proveedor) {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/proveedores/${id_proveedor}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    const proveedor = await res.json();

    document.getElementById('nombreProveedor').value = proveedor.nombre;
    document.getElementById('contactoProveedor').value = proveedor.contacto;
    document.getElementById('telefonoProveedor').value = proveedor.telefono;
    document.getElementById('emailProveedor').value = proveedor.email;
    document.getElementById('direccionProveedor').value = proveedor.direccion;
    document.getElementById('formEditProveedor').setAttribute('data-id', proveedor.id_proveedor);

    document.getElementById('tituloModalProveedor').innerText = 'Editar Proveedor';
    document.getElementById('formulario-editar-proveedor').style.display = 'flex';
}

function cerrarModalProveedor() {
    document.getElementById('formulario-editar-proveedor').style.display = 'none';
}

// Eliminar proveedor
async function eliminarProveedor(id_proveedor) {
    const token = localStorage.getItem('token');
    if (!confirm("¿Estás seguro de eliminar este proveedor?")) return;

    const res = await fetch(`http://localhost:5000/api/proveedores/${id_proveedor}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token
        }
    });

    if (res.ok) {
        alert('Proveedor eliminado correctamente');
        cargarProveedores();
    } else {
        alert('Error al eliminar el proveedor');
    }
}

// Buscar proveedor
function buscarProveedor() {
    const input = document.getElementById('searchBarProveedores').value.toLowerCase();
    const proveedores = document.querySelectorAll('.card-proveedor');

    proveedores.forEach(proveedor => {
        const texto = proveedor.innerText.toLowerCase();
        proveedor.style.display = texto.includes(input) ? '' : 'none';
    });
}

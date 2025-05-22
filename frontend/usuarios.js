document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const form = document.getElementById("form-usuario");
  const modal = document.getElementById("modal-usuario");
  const tituloModal = document.getElementById("modal-titulo");

  let modoEdicion = false;
  let idUsuarioEditar = null;

  obtenerUsuarios();
  cargarRoles();
  cargarEmpleados();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre_usuario = document.getElementById("nombre_usuario").value;
    const contraseña = document.getElementById("contraseña").value;
    const id_rol = document.getElementById("rol").value;
    const id_empleado = document.getElementById("empleado").value;

    const url = modoEdicion
      ? `http://localhost:5000/api/usuarios/${idUsuarioEditar}`
      : "http://localhost:5000/api/usuarios";

    const metodo = modoEdicion ? "PUT" : "POST";

    try {
      const respuesta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre_usuario,
          contraseña,
          id_rol,
          id_empleado,
        }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.mensaje || "Error al guardar el usuario");
      }

      alert(modoEdicion ? "Usuario actualizado" : "Usuario creado");
      form.reset();
      cerrarModalUsuario();
      obtenerUsuarios();
    } catch (error) {
      alert("Error: " + error.message);
    }
  });

  async function obtenerUsuarios() {
    try {
      const respuesta = await fetch("http://localhost:5000/api/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const usuarios = await respuesta.json();

      const tbody = document.getElementById("tbody-usuarios");
      tbody.innerHTML = "";

      usuarios.forEach((usuario) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td>${usuario.nombre_usuario}</td>
          <td>${usuario.nombre_empleado}</td>
          <td>${usuario.nombre_rol}</td>
          <td>${usuario.estado}</td>
          <td>
            <button class="btn-editar" data-id="${usuario.id_usuario}">Editar</button>
            <button class="btn-estado" data-id="${usuario.id_usuario}" data-estado="${usuario.estado}">
              ${usuario.estado === "activo" ? "Inactivar" : "Activar"}
            </button>
            <button class="btn-eliminar" data-id="${usuario.id_usuario}">Eliminar</button>
          </td>
        `;

        tbody.appendChild(fila);
      });

      agregarListenersBotones();
    } catch (error) {
      console.error("Error al obtener usuarios:", error.message);
    }
  }

  function agregarListenersBotones() {
    document.querySelectorAll(".btn-editar").forEach((btn) => {
      btn.addEventListener("click", () => editarUsuario(btn.dataset.id));
    });

    document.querySelectorAll(".btn-estado").forEach((btn) => {
      btn.addEventListener("click", () =>
        cambiarEstado(btn.dataset.id, btn.dataset.estado)
      );
    });

    document.querySelectorAll(".btn-eliminar").forEach((btn) => {
      btn.addEventListener("click", () => eliminarUsuario(btn.dataset.id));
    });
  }

  async function cargarRoles() {
    try {
      const respuesta = await fetch("http://localhost:5000/api/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const roles = await respuesta.json();
      const select = document.getElementById("rol");
      select.innerHTML = "";

      roles.forEach((rol) => {
        const option = document.createElement("option");
        option.value = rol.id_rol;
        option.textContent = rol.nombre;
        select.appendChild(option);
      });
    } catch (error) {
      console.error("Error al cargar roles:", error.message);
    }
  }

  async function cargarEmpleados() {
    try {
      const respuesta = await fetch("http://localhost:5000/api/empleados", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const empleados = await respuesta.json();
      const select = document.getElementById("empleado");
      select.innerHTML = "";

      empleados.forEach((empleado) => {
        const option = document.createElement("option");
        option.value = empleado.id_empleado;
        option.textContent = `${empleado.nombre} ${empleado.apellido}`;
        select.appendChild(option);
      });
    } catch (error) {
      console.error("Error al cargar empleados:", error.message);
    }
  }

  window.abrirModalUsuario = () => {
    modoEdicion = false;
    idUsuarioEditar = null;
    tituloModal.textContent = "Nuevo Usuario";
    form.reset();
    modal.style.display = "block";
  };

  window.cerrarModalUsuario = () => {
    modal.style.display = "none";
  };

  async function editarUsuario(id) {
    try {
      const respuesta = await fetch(`http://localhost:5000/api/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const usuarios = await respuesta.json();
      const usuario = usuarios.find((u) => u.id_usuario == id);

      if (!usuario) throw new Error("Usuario no encontrado");

      modoEdicion = true;
      idUsuarioEditar = id;

      document.getElementById("nombre_usuario").value = usuario.nombre_usuario;
      document.getElementById("contraseña").value = ""; // Por seguridad
      document.getElementById("rol").value = usuario.id_rol;
      document.getElementById("empleado").value = usuario.id_empleado;

      tituloModal.textContent = "Editar Usuario";
      modal.style.display = "block";
    } catch (error) {
      alert("Error al editar usuario: " + error.message);
    }
  }

  async function cambiarEstado(id, estadoActual) {
    try {
      const respuesta = await fetch(`http://localhost:5000/api/usuarios/estado/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.mensaje || "No se pudo cambiar el estado");
      }

      obtenerUsuarios();
    } catch (error) {
      alert("Error al cambiar estado: " + error.message);
    }
  }

  async function eliminarUsuario(id) {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;

    try {
      const respuesta = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.mensaje || "No se pudo eliminar el usuario");
      }

      obtenerUsuarios();
    } catch (error) {
      alert("Error al eliminar usuario: " + error.message);
    }
  }
});

// Estas funciones son globales (para el menú principal)
function mostrarSeccionConfiguracion() {
  ocultarTodasLasSecciones();
  document.getElementById("seccion-configuracion").style.display = "block";
}

function ocultarTodasLasSecciones() {
  const secciones = document.querySelectorAll("section");
  secciones.forEach((seccion) => {
    seccion.style.display = "none";
  });
}


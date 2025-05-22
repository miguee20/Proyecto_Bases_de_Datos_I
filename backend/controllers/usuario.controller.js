const db = require('../config/db');
const bcrypt = require('bcrypt');

// Obtener lista de usuarios
exports.obtenerUsuarios = (req, res) => {
  const sql = `
    SELECT u.id_usuario, u.nombre_usuario, r.nombre AS rol, 
           e.nombre AS nombre_empleado, u.estado 
    FROM usuario u
    JOIN rol r ON u.id_rol = r.id_rol
    JOIN empleado e ON u.id_empleado = e.id_empleado
  `;

  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
    }
    res.json(results);
  });
};

// Crear nuevo usuario
exports.crearUsuario = (req, res) => {
  const { nombre_usuario, contraseña, id_rol, id_empleado } = req.body;

  bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al encriptar la contraseña', error: err });
    }

    const sql = `
      INSERT INTO usuario (nombre_usuario, contraseña, id_rol, id_empleado, estado)
      VALUES (?, ?, ?, ?, 'activo')
    `;

    db.query(sql, [nombre_usuario, hashedPassword, id_rol, id_empleado], (error) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error al crear usuario', error });
      }
      res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    });
  });
};

// Actualizar usuario (rol o empleado)
exports.actualizarUsuario = (req, res) => {
  const id_usuario = req.params.id;
  const { id_rol, id_empleado } = req.body;

  const sql = `UPDATE usuario SET id_rol = ?, id_empleado = ? WHERE id_usuario = ?`;

  db.query(sql, [id_rol, id_empleado, id_usuario], (error) => {
    if (error) {
      return res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
    }
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  });
};

// Cambiar estado del usuario
exports.cambiarEstadoUsuario = (req, res) => {
  const id_usuario = req.params.id;
  const { estado } = req.body;

  const sql = `UPDATE usuario SET estado = ? WHERE id_usuario = ?`;

  db.query(sql, [estado, id_usuario], (error) => {
    if (error) {
      return res.status(500).json({ mensaje: 'Error al cambiar estado', error });
    }
    res.json({ mensaje: 'Estado actualizado correctamente' });
  });
};

// Eliminar usuario
exports.eliminarUsuario = (req, res) => {
  const id_usuario = req.params.id;

  db.query(`DELETE FROM usuario WHERE id_usuario = ?`, [id_usuario], (error) => {
    if (error) {
      return res.status(500).json({ mensaje: 'Error al eliminar usuario', error });
    }
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  });
};

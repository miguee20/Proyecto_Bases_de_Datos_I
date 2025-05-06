// backend/controllers/loginController.js
const db = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;

  const query = `
    SELECT u.id_usuario, u.nombre_usuario, u.id_rol, r.nombre AS rol, e.nombre AS nombre_empleado
    FROM usuario u
    JOIN rol r ON u.id_rol = r.id_rol
    JOIN empleado e ON u.id_empleado = e.id_empleado
    WHERE u.nombre_usuario = ? AND u.contraseña = ?
  `;

  db.query(query, [nombre_usuario, contraseña], (err, results) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error en el servidor', error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const usuario = results[0];

    // Si el rol es admin, se usa nombre fijo
    const nombreMostrado = usuario.rol === 'admin' ? 'Juan Manuel Sandoval' : usuario.nombre_empleado;

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        nombre_usuario: usuario.nombre_usuario,
        rol: usuario.rol,
        nombre_mostrado: nombreMostrado
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviamos también nombre_mostrado en la respuesta
    res.json({
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre_usuario: usuario.nombre_usuario,
        rol: usuario.rol,
        nombre_mostrado: nombreMostrado
      }
    });
  });
};

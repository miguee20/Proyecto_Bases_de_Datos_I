const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.login = async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;

  if (!nombre_usuario || !contraseña) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña requeridos' });
  }

  const query = `
    SELECT u.id_usuario, u.nombre_usuario, u.contraseña, u.id_rol, r.nombre AS rol, e.nombre AS nombre_empleado
    FROM usuario u
    JOIN rol r ON u.id_rol = r.id_rol
    JOIN empleado e ON u.id_empleado = e.id_empleado
    WHERE u.nombre_usuario = ?
    LIMIT 1
  `;

  db.query(query, [nombre_usuario], async (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error en el servidor', error: err });
    if (results.length === 0) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

    const usuario = results[0];
    const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!coincide) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

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

    // Enviar token en cookie y también en JSON
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // poner en true si usas HTTPS
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1 hora
    });

    res.json({
      mensaje: 'Login exitoso',
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

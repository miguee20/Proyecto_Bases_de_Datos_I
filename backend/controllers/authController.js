const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// Login de usuario
const login = (req, res) => {
    const { usuario, contrasena } = req.body;

    // Buscar el usuario en la base de datos
    Usuario.buscarPorUsuario(usuario, (err, user) => {
        if (err) return res.status(500).json({ mensaje: 'Error del servidor' });
        if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        // Verificar la contraseña
        if (user.contrasena !== contrasena) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.id, rol: user.rol_nombre }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        // Responder con el token y rol del usuario
        return res.json({ mensaje: 'Acceso concedido', token, rol: user.rol_nombre });
    });
};

module.exports = { login };

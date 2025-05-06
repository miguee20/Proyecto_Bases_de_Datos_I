// authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../config/db');
const dotenv = require('dotenv');
const { verificarToken } = require('../middlewares/auth');


dotenv.config();

router.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({ mensaje: 'Usuario y contraseña requeridos' });
    }

    const query = `
        SELECT u.id_usuario, u.usuario, u.id_empleado, r.nombre AS rol
        FROM usuario u
        JOIN rol r ON u.id_rol = r.id_rol
        WHERE u.usuario = ? AND u.contrasena = ?
        LIMIT 1
    `;

    connection.query(query, [usuario, contrasena], (err, results) => {
        if (err) {
            console.error('Error al consultar base de datos:', err);
            return res.status(500).json({ mensaje: 'Error del servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const usuarioDB = results[0];

        // Crear el token
        const token = jwt.sign(
            {
                id_usuario: usuarioDB.id_usuario,
                id_empleado: usuarioDB.id_empleado,
                rol: usuarioDB.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Guardar el token en una cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 // 1 hora
        });

        res.json({
            mensaje: 'Login exitoso',
            id_usuario: usuarioDB.id_usuario,
            id_empleado: usuarioDB.id_empleado,
            rol: usuarioDB.rol
        });
    });
});

//router.get('/verify-session', verificarToken, (req, res) => {
    // Si llega aquí, el token es válido
    //res.json({
        //isAuthenticated: true,
        //usuario: req.usuario
    //});
//});
router.get('/verify-session', verificarToken, (req, res) => {
    res.json({
        isAuthenticated: true,
        rol: req.usuario.rol,
        id_usuario: req.usuario.id_usuario
    });
});


module.exports = router;


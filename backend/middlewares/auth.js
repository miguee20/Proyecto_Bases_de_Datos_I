// backend/middlewares/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
    let token;

    // Intentar desde el header Authorization
    if (req.headers['authorization']) {
        token = req.headers['authorization'].split(' ')[1];
    }

    // Si no está, intentar desde la cookie
    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
};

module.exports = {
    verificarToken
};


// backend/middlewares/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
    let token = null;

    // Primero intentamos obtenerlo del header Authorization (Bearer TOKEN)
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    // Si no está en header, intentamos desde cookie
    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    // Si no hay token en ningún lugar
    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // usuario tendrá id_usuario, rol, etc.
        next();
    } catch (err) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
};

module.exports = {
    verificarToken
};

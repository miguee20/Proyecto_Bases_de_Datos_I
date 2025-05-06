// backend/models/usuario.js
const db = require('../config/db');

const Usuario = {
    buscarPorUsuario: (usuario, callback) => {
        const sql = `
            SELECT u.*, r.nombre AS rol_nombre
            FROM usuario u
            JOIN rol r ON u.id_rol = r.id
            WHERE u.usuario = ?
        `;
        db.query(sql, [usuario], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }
};

module.exports = Usuario;

const db = require('../config/db');

const obtenerRoles = (req, res) => {
  db.query('SELECT id_rol, nombre FROM rol', (error, results) => {
    if (error) {
      console.error('Error al obtener roles:', error);
      return res.status(500).json({ mensaje: 'Error al obtener roles' });
    }
    res.json(results);
  });
};

module.exports = {
  obtenerRoles
};

const db = require('../config/db');

const obtenerEmpleados = (req, res) => {
  db.query('SELECT id_empleado, nombre, apellido FROM empleado', (error, results) => {
    if (error) {
      console.error('Error al obtener empleados:', error);
      return res.status(500).json({ mensaje: 'Error al obtener empleados' });
    }
    res.json(results);
  });
};

module.exports = {
  obtenerEmpleados
};

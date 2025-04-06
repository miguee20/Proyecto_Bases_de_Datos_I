const connection = require('../config/db');

const Venta = {
  // Registrar una venta
  create: (cliente_id, producto_id, cantidad, total, fecha, callback) => {
    const query = 'INSERT INTO ventas (cliente_id, producto_id, cantidad, total, fecha) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [cliente_id, producto_id, cantidad, total, fecha], callback);
  },

  // Obtener todas las ventas
  getAll: (callback) => {
    const query = 'SELECT * FROM ventas';
    connection.query(query, callback);
  },

  // Obtener ventas por cliente
  getByClienteId: (cliente_id, callback) => {
    const query = 'SELECT * FROM ventas WHERE cliente_id = ?';
    connection.query(query, [cliente_id], callback);
  }
};

module.exports = Venta;

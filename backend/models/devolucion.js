const connection = require('../config/db');

const Devolucion = {
  // Crear devolución
  create: (fecha, motivo, id_venta, id_cliente, total, callback) => {
    const query = 'INSERT INTO devolucion (fecha, motivo, id_venta, id_cliente, total) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [fecha, motivo, id_venta, id_cliente, total], callback);
  },

  // Obtener todas
  getAll: (callback) => {
    const query = 'SELECT * FROM devolucion';
    connection.query(query, callback);
  },

  // Obtener por ID
  getById: (id, callback) => {
    const query = 'SELECT * FROM devolucion WHERE id_devolucion = ?';
    connection.query(query, [id], callback);
  },

  // Actualizar devolución
  update: (id, fecha, motivo, id_venta, id_cliente, total, callback) => {
    const query = 'UPDATE devolucion SET fecha = ?, motivo = ?, id_venta = ?, id_cliente = ?, total = ? WHERE id_devolucion = ?';
    connection.query(query, [fecha, motivo, id_venta, id_cliente, total, id], callback);
  },

  // Eliminar
  delete: (id, callback) => {
    const query = 'DELETE FROM devolucion WHERE id_devolucion = ?';
    connection.query(query, [id], callback);
  }
};

module.exports = Devolucion;

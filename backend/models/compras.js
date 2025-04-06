const connection = require('../config/db');

const Compra = {
  // Registrar una compra
  create: (fecha, total, id_proveedor, id_empleado, id_sucursal, callback) => {
    const query = 'INSERT INTO Compra (fecha, total, id_proveedor, id_empleado, id_sucursal) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [fecha, total, id_proveedor, id_empleado, id_sucursal], callback);
  },

  // Obtener todas las compras
  getAll: (callback) => {
    const query = 'SELECT * FROM Compra';
    connection.query(query, callback);
  },

  // Obtener compras por proveedor (opcional)
  getByProveedor: (id_proveedor, callback) => {
    const query = 'SELECT * FROM Compra WHERE id_proveedor = ?';
    connection.query(query, [id_proveedor], callback);
  }
};

module.exports = Compra;

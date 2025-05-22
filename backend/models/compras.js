const connection = require('../config/db');

const Compra = {
  create: (producto, proveedor, cantidad, fecha, callback) => {
    const query = 'INSERT INTO Compra (producto, proveedor, cantidad, fecha) VALUES (?, ?, ?, ?)';
    connection.query(query, [producto, proveedor, cantidad, fecha], callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM Compra';
    connection.query(query, callback);
  }
};

module.exports = Compra;


const connection = require('../config/db');


const Cliente = {
  // Crear un nuevo cliente
  create: (nombre, direccion, correo, telefono, callback) => {
    const query = 'INSERT INTO clientes (nombre, direccion, correo, telefono) VALUES (?, ?, ?, ?)';
    connection.query(query, [nombre, direccion, correo, telefono], callback);
  },
  
  // Obtener todos los clientes
  getAll: (callback) => {
    const query = 'SELECT * FROM clientes';
    connection.query(query, callback);
  },

  // Obtener un cliente por ID
  getById: (id, callback) => {
    const query = 'SELECT * FROM clientes WHERE id = ?';
    connection.query(query, [id], callback);
  },

  // Actualizar un cliente
  update: (id, nombre, direccion, correo, telefono, callback) => {
    const query = 'UPDATE clientes SET nombre = ?, direccion = ?, correo = ?, telefono = ? WHERE id = ?';
    connection.query(query, [nombre, direccion, correo, telefono, id], callback);
  },

  // Eliminar un cliente
  delete: (id, callback) => {
    const query = 'DELETE FROM clientes WHERE id = ?';
    connection.query(query, [id], callback);
  }
};

module.exports = Cliente;

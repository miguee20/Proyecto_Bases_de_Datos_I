const connection = require('../config/db');

const Cliente = {
  // Crear un nuevo cliente
  create: (nombre, apellido, nit, telefono, email, direccion, callback) => {
    const query = 'INSERT INTO cliente (nombre, apellido, nit, telefono, email, direccion) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [nombre, apellido, nit, telefono, email, direccion], callback);
  },
  
  // Obtener todos los clientes
  getAll: (callback) => {
    const query = 'SELECT * FROM cliente';
    connection.query(query, callback);
  },

  // Obtener un cliente por ID
  getById: (id_cliente, callback) => {
    const query = 'SELECT * FROM cliente WHERE id_cliente = ?';
    connection.query(query, [id_cliente], callback);
  },

  // Actualizar un cliente
  update: (id_cliente, nombre, apellido, nit, telefono, email, direccion, callback) => {
    const query = 'UPDATE cliente SET nombre = ?, apellido = ?, nit = ?, telefono = ?, email = ?, direccion = ? WHERE id_cliente = ?';
    connection.query(query, [nombre, apellido, nit, telefono, email, direccion, id_cliente], callback);
  },

  // Eliminar un cliente
  delete: (id_cliente, callback) => {
    const query = 'DELETE FROM cliente WHERE id_cliente = ?';
    connection.query(query, [id_cliente], callback);
  }
};

module.exports = Cliente;

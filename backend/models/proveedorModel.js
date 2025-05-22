const db = require('../config/db');  // Conexión a la base de datos

// Obtener todos los proveedores
const obtenerProveedores = (callback) => {
    db.query('SELECT * FROM proveedor', (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

// Obtener un proveedor por ID
const obtenerProveedorPorId = (id, callback) => {
    db.query('SELECT * FROM proveedor WHERE id_proveedor = ?', [id], (err, results) => {
        if (err) return callback(err, null);
        if (results.length === 0) return callback(new Error('Proveedor no encontrado'), null);
        callback(null, results[0]);
    });
};

// Crear un nuevo proveedor
const crearProveedor = (data, callback) => {
    db.query(
        'INSERT INTO proveedor (nombre, contacto, direccion, telefono, email) VALUES (?, ?, ?, ?, ?)', 
        [data.nombre, data.contacto, data.direccion, data.telefono, data.email], 
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, { id: results.insertId, ...data });
        }
    );
};

// Actualizar un proveedor
const actualizarProveedor = (id, data, callback) => {
    db.query(
        'UPDATE proveedor SET nombre = ?, contacto = ?, direccion = ?, telefono = ?, email = ? WHERE id_proveedor = ?', 
        [data.nombre, data.contacto, data.direccion, data.telefono, data.email, id], 
        (err, results) => {
            if (err) return callback(err, null);
            callback(null, { id, ...data });
        }
    );
};

// Eliminar un proveedor
const eliminarProveedor = (id, callback) => {
    db.query('DELETE FROM proveedor WHERE id_proveedor = ?', [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

module.exports = {
    obtenerProveedores,
    obtenerProveedorPorId,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
};

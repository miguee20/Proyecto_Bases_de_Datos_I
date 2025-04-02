const db = require('../config/db');  // Conexión a la base de datos

// Obtener todos los proveedores
const obtenerProveedores = (callback) => {
    db.query('SELECT * FROM proveedor', (err, results) => {  // Usar db.query
        if (err) {
            console.error('Error al obtener proveedores:', err);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};

// Obtener un proveedor por ID
const obtenerProveedorPorId = (id, callback) => {
    db.query('SELECT * FROM proveedor WHERE id = ?', [id], (err, results) => {  // Usar db.query
        if (err) {
            console.error('Error al obtener proveedor:', err);
            callback(err, null);
            return;
        }
        if (results.length === 0) {
            callback(new Error('Proveedor no encontrado'), null);
            return;
        }
        callback(null, results[0]);
    });
};

// Crear un nuevo proveedor
const crearProveedor = (data, callback) => {
    db.query('INSERT INTO proveedor (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)', 
    [data.nombre, data.direccion, data.telefono, data.email], 
    (err, results) => {  // Usar db.query
        if (err) {
            console.error('Error al crear proveedor:', err);
            callback(err, null);
            return;
        }
        callback(null, { id: results.insertId, ...data });
    });
};

// Actualizar un proveedor
const actualizarProveedor = (id, data, callback) => {
    db.query('UPDATE proveedor SET nombre = ?, direccion = ?, telefono = ?, email = ? WHERE id = ?', 
    [data.nombre, data.direccion, data.telefono, data.email, id], 
    (err, results) => {  // Usar db.query
        if (err) {
            console.error('Error al actualizar proveedor:', err);
            callback(err, null);
            return;
        }
        callback(null, { id, ...data });
    });
};

// Eliminar un proveedor
const eliminarProveedor = (id, callback) => {
    db.query('DELETE FROM proveedor WHERE id = ?', [id], (err, results) => {  // Usar db.query
        if (err) {
            console.error('Error al eliminar proveedor:', err);
            callback(err, null);
            return;
        }
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

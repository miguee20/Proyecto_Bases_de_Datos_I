const db = require('../config/db');

// Obtener todos los productos
const obtenerProductos = (callback) => {
    db.query('SELECT * FROM producto', (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Obtener un producto por su ID
const obtenerProductoPorId = (id, callback) => {
    db.query('SELECT * FROM producto WHERE id_producto = ?', [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

// Crear un nuevo producto
const crearProducto = (producto, callback) => {
    const { nombre, descripcion, precio, stock, id_categoria, id_proveedor } = producto;
    db.query(
        'INSERT INTO producto (nombre, descripcion, precio, stock, id_categoria, id_proveedor) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, descripcion, precio, stock, id_categoria, id_proveedor],
        (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        }
    );
};

// Actualizar un producto
const actualizarProducto = (id, producto, callback) => {
    const { nombre, descripcion, precio, stock, id_categoria, id_proveedor } = producto;
    db.query(
        'UPDATE producto SET nombre = ?, descripcion = ?, precio = ?, stock = ?, id_categoria = ?, id_proveedor = ? WHERE id_producto = ?',
        [nombre, descripcion, precio, stock, id_categoria, id_proveedor, id],
        (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        }
    );
};

// Eliminar un producto
const eliminarProducto = (id, callback) => {
    db.query('DELETE FROM producto WHERE id_producto = ?', [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.affectedRows === 0) {
            return callback(null, { mensaje: 'Producto no encontrado' });
        }
        callback(null, { mensaje: 'Producto eliminado' });
    });
};

module.exports = { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto };


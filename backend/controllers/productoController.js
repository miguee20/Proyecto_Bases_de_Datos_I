const productoModel = require('../models/productoModel');

// Obtener todos los productos
const obtenerProductos = (req, res) => {
    productoModel.obtenerProductos((err, productos) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los productos' });
        }
        res.json(productos);
    });
};

// Obtener un producto por ID
const obtenerProductoPorId = (req, res) => {
    const { id } = req.params;
    productoModel.obtenerProductoPorId(id, (err, producto) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el producto' });
        }
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(producto);
    });
};

// Crear un nuevo producto
const crearProducto = (req, res) => {
    const producto = req.body;
    productoModel.crearProducto(producto, (err, idProducto) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear el producto' });
        }
        res.status(201).json({ mensaje: 'Producto creado', id_producto: idProducto });
    });
};

// Actualizar un producto
const actualizarProducto = (req, res) => {
    const { id } = req.params;
    const producto = req.body;
    productoModel.actualizarProducto(id, producto, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el producto' });
        }
        res.json({ mensaje: 'Producto actualizado' });
    });
};

// Eliminar un producto
const eliminarProducto = (req, res) => {
    const { id } = req.params;
    productoModel.eliminarProducto(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el producto' });
        }
        res.json({ mensaje: 'Producto eliminado' });
    });
};

module.exports = { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto };

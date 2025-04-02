const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Rutas de productos
router.get('/', productoController.obtenerProductos); // Obtener todos los productos
router.get('/:id', productoController.obtenerProductoPorId); // Obtener un producto por ID
router.post('/', productoController.crearProducto); // Crear un nuevo producto
router.put('/:id', productoController.actualizarProducto); // Actualizar un producto
router.delete('/:id', productoController.eliminarProducto); // Eliminar un producto

module.exports = router;

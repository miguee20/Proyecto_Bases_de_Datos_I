const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

// Definir las rutas y vincularlas con los métodos del controlador
router.get('/', ventasController.obtenerVentas);  // Obtener todas las ventas
router.post('/', ventasController.crearVenta);    // Crear una nueva venta
router.put('/:id', ventasController.actualizarVenta);  // Actualizar una venta
router.delete('/:id', ventasController.eliminarVenta); // Eliminar una venta

module.exports = router;

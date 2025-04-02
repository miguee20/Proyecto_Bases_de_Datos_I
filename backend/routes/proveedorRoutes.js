const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

// Rutas de proveedores
router.get('/proveedores', proveedorController.obtenerProveedores);
router.get('/proveedores/:id', proveedorController.obtenerProveedorPorId);
router.post('/proveedores', proveedorController.crearProveedor);
router.put('/proveedores/:id', proveedorController.actualizarProveedor);
router.delete('/proveedores/:id', proveedorController.eliminarProveedor);

module.exports = router;

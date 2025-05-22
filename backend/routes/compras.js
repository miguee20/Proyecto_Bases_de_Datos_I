// ✔ compras.js
const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');
const { verificarToken } = require('../middlewares/auth');

// Aplicar el middleware de autenticación a todas las rutas en este archivo
router.use(verificarToken);

router.get('/', comprasController.obtenerCompras);
router.post('/', comprasController.crearCompra);
router.put('/:id', comprasController.actualizarCompra);
router.delete('/:id', comprasController.eliminarCompra);

module.exports = router;

const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');

router.get('/', comprasController.obtenerCompras);
router.post('/', comprasController.crearCompra);
router.put('/:id', comprasController.actualizarCompra);
router.delete('/:id', comprasController.eliminarCompra);

module.exports = router;

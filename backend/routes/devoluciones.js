const express = require('express');
const router = express.Router();
const devolucionesController = require('../controllers/devolucionesController');

router.get('/', devolucionesController.obtenerDevoluciones);
router.post('/', devolucionesController.crearDevolucion);
router.put('/:id', devolucionesController.actualizarDevolucion);
router.delete('/:id', devolucionesController.eliminarDevolucion);

module.exports = router;

const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const { verificarToken } = require('../middlewares/auth');

router.use(verificarToken);

router.get('/', clientesController.obtenerClientes);
router.get('/:id', clientesController.obtenerClientePorId);
router.post('/', clientesController.crearCliente);
router.put('/:id', clientesController.actualizarCliente);
router.delete('/:id', clientesController.eliminarCliente);

module.exports = router;

const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/auth');
const {
  registrarVenta,
  obtenerVentas,
  eliminarVenta,
  editarVenta,
  obtenerVentaPorId
} = require('../controllers/ventasController');

// CRUD para ventas
router.get('/', verificarToken, obtenerVentas);
router.post('/', verificarToken, registrarVenta);
router.delete('/:id', verificarToken, eliminarVenta);
router.put('/:id', verificarToken, editarVenta);
router.get('/:id', verificarToken, obtenerVentaPorId);

module.exports = router;

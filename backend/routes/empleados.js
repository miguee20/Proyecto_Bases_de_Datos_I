const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleados.controller');
const { verificarToken } = require('../middlewares/auth');

// Obtener todos los empleados
router.get('/', verificarToken, empleadosController.obtenerEmpleados);

// Puedes agregar rutas POST, PUT, DELETE si decides administrar empleados desde el frontend

module.exports = router;

const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roles.controller');
const { verificarToken } = require('../middlewares/auth');

// Obtener todos los roles
router.get('/', verificarToken, rolesController.obtenerRoles);

// Puedes agregar rutas POST, PUT, DELETE si decides gestionar roles desde el frontend

module.exports = router;

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { verificarToken } = require('../middlewares/auth');

// Middleware para proteger todas las rutas
router.use(verificarToken);

// Rutas para gestión de usuarios
router.get('/', usuarioController.obtenerUsuarios);               // Listar usuarios
router.post('/', usuarioController.crearUsuario);                 // Crear usuario
router.put('/:id', usuarioController.actualizarUsuario);          // Actualizar rol o empleado
router.patch('/:id/estado', usuarioController.cambiarEstadoUsuario); // Activar/Inactivar
router.delete('/:id', usuarioController.eliminarUsuario);         // Eliminar usuario

module.exports = router;

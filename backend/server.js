const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

// Importar rutas
const loginRoutes = require('./routes/login');
const productoRoutes = require('./routes/productoRoutes');
const clientesRoutes = require('./routes/clientes');
const comprasRoutes = require('./routes/compras');
const ventasRoutes = require('./routes/ventas');
const proveedorRoutes = require('./routes/proveedorRoutes');
const authRoutes = require('./routes/authRoutes');
const verifySessionRoutes = require('./routes/verify-session');
const usuarioRoutes = require('./routes/usuarios');
const rolesRoutes = require('./routes/roles');
const empleadosRoutes = require('./routes/empleados');




// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Configurar middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/login', loginRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/compras', comprasRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api', proveedorRoutes);
app.use('/api/login', require('./routes/login'));
app.use('/api', verifySessionRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/empleados', empleadosRoutes);





// Ruta para acceder a login.html directamente
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Ruta principal
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente 🚀');
});

// Ruta protegida de prueba
const { verificarToken } = require('./middlewares/auth');
app.get('/api/menu-admin', verificarToken, (req, res) => {
    res.json({ mensaje: `Bienvenido, ${req.usuario.rol}` });
});

// Manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).send('Página no encontrada o no implementada aún 🥲');
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

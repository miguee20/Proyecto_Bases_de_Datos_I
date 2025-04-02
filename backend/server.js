// Importar módulos necesarios
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Importar rutas
const productoRoutes = require('./routes/productoRoutes');  // Cambié a productoRoutes
const clientesRoutes = require('./routes/clientes');
const comprasRoutes = require('./routes/compras');
const ventasRoutes = require('./routes/ventas');
const devolucionesRoutes = require('./routes/devoluciones');
const proveedorRoutes = require('./routes/proveedorRoutes');

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Configurar middlewares
app.use(cors({ origin: true, credentials: true })); // Habilitar CORS
app.use(express.json()); // Soporte para JSON
app.use(express.urlencoded({ extended: true })); // Soporte para formularios
app.use(morgan('dev')); // Logger HTTP
app.use(cookieParser()); // Manejo de cookies
app.use('/api', proveedorRoutes); // manejo de proveedores

// Ruta principal de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente 🚀');
});

// Usar las rutas
// Usar las rutas
app.use('/api/productos', productoRoutes);  // Usamos productoRoutes aquí
app.use('/api/clientes', clientesRoutes);
app.use('/api/compras', comprasRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/devoluciones', devolucionesRoutes);

// Definir el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

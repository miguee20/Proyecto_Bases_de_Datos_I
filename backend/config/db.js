const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3307,  // Aquí usamos el puerto de la variable de entorno
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fragancia'
});

// Conectar a la base de datos
connection.connect(err => {
    if (err) {
        console.error('❌ Error al conectar a la base de datos:', err);
        return;
    }
    console.log('✅ Conectado a la base de datos MariaDB');
});

module.exports = connection;

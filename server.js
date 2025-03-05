const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');

// Configuración de dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos MariaDB
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '4521', // Cambia esto según tu configuración
  database: process.env.DB_NAME || 'fragancia',
});

// Verificar conexión
db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
    return;
  }
  console.log('✅ Conexión exitosa a la base de datos');
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido al sistema de Fragancia!');
});

// 🔹 Obtener todos los productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('❌ Error al obtener productos:', err);
      res.status(500).json({ error: 'Error al obtener productos' });
      return;
    }
    res.json(results);
  });
});

// 🔹 Agregar un nuevo producto (CORRECCIÓN)
app.post("/productos", (req, res) => {
  const { nombre, descripcion, precio, cantidad } = req.body;

  if (!nombre || !descripcion || !precio || !cantidad) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const sql = "INSERT INTO productos (nombre, descripcion, precio, cantidad) VALUES (?, ?, ?, ?)";
  db.query(sql, [nombre, descripcion, precio, cantidad], (err, result) => {
    if (err) {
      console.error("❌ Error al agregar producto:", err);
      res.status(500).json({ error: "Error al agregar producto" });
      return;
    }

    res.json({ mensaje: "✅ Producto agregado correctamente", id: result.insertId });
  });
});

// 🔹 Editar producto
app.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, cantidad } = req.body;

  db.query(
    "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ? WHERE id = ?",
    [nombre, descripcion, precio, cantidad, id],
    (err, result) => {
      if (err) {
        console.error("❌ Error al actualizar producto:", err);
        res.status(500).json({ error: "Error al actualizar producto" });
        return;
      }

      res.json({ mensaje: "✅ Producto actualizado correctamente" });
    }
  );
});

// 🔹 Eliminar producto
app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM productos WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("❌ Error al eliminar producto:", err);
      res.status(500).json({ error: "Error al eliminar producto" });
      return;
    }

    res.json({ mensaje: "✅ Producto eliminado correctamente" });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
const db = require('../config/db');

// Obtener todas las compras
exports.obtenerCompras = (req, res) => {
    db.query('SELECT * FROM Compra', (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al obtener compras');
      }
      res.json(result);
    });
  };
  
  // Crear una nueva compra
  exports.crearCompra = (req, res) => {
    const { producto, proveedor, cantidad, fecha } = req.body;
    const query = 'INSERT INTO Compra (producto, proveedor, cantidad, fecha) VALUES (?, ?, ?, ?)';
    db.query(query, [producto, proveedor, cantidad, fecha], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al crear la compra');
      }
      res.status(201).send('Compra creada correctamente');
    });
  };
  
  // Actualizar una compra
  exports.actualizarCompra = (req, res) => {
    const { id } = req.params;
    const { producto, proveedor, cantidad, fecha } = req.body;
    const query = 'UPDATE Compra SET producto = ?, proveedor = ?, cantidad = ?, fecha = ? WHERE id_compra = ?';
    db.query(query, [producto, proveedor, cantidad, fecha, id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al actualizar la compra');
      }
      res.send('Compra actualizada correctamente');
    });
  };
  
// Eliminar una compra
exports.eliminarCompra = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Compra WHERE id_compra = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al eliminar la compra');
        }
        res.send('Compra eliminada correctamente');
    });
};

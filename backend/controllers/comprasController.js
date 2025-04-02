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
    const { id_cliente, fecha_compra, total } = req.body;
    const query = 'INSERT INTO Compra (id_cliente, fecha_compra, total) VALUES (?, ?, ?)';
    db.query(query, [id_cliente, fecha_compra, total], (err, result) => {
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
    const { id_cliente, fecha_compra, total } = req.body;
    const query = 'UPDATE Compra SET id_cliente = ?, fecha_compra = ?, total = ? WHERE id_compra = ?';
    db.query(query, [id_cliente, fecha_compra, total, id], (err, result) => {
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

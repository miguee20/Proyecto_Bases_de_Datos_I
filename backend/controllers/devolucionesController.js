const db = require('../config/db');

// Obtener todas las devoluciones
exports.obtenerDevoluciones = (req, res) => {
    db.query('SELECT * FROM Devolucion', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al obtener devoluciones');
        }
        res.json(result);
    });
};

// Crear una nueva devolución
exports.crearDevolucion = (req, res) => {
    const { id_venta, fecha_devolucion, total } = req.body;
    const query = 'INSERT INTO Devolucion (id_venta, fecha_devolucion, total) VALUES (?, ?, ?)';
    db.query(query, [id_venta, fecha_devolucion, total], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al crear la devolución');
        }
        res.status(201).send('Devolución creada correctamente');
    });
};

// Actualizar una devolución
exports.actualizarDevolucion = (req, res) => {
    const { id } = req.params;
    const { id_venta, fecha_devolucion, total } = req.body;
    const query = 'UPDATE Devolucion SET id_venta = ?, fecha_devolucion = ?, total = ? WHERE id_devolucion = ?';
    db.query(query, [id_venta, fecha_devolucion, total, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al actualizar la devolución');
        }
        res.send('Devolución actualizada correctamente');
    });
};

// Eliminar una devolución
exports.eliminarDevolucion = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Devolucion WHERE id_devolucion = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al eliminar la devolución');
        }
        res.send('Devolución eliminada correctamente');
    });
};

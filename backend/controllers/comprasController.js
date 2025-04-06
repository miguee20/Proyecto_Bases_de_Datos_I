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
    const { fecha, total, id_proveedor, id_empleado, id_sucursal } = req.body;
    const query = 'INSERT INTO Compra (fecha, total, id_proveedor, id_empleado, id_sucursal) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [fecha, total, id_proveedor, id_empleado, id_sucursal], (err, result) => {
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
    const { fecha, total, id_proveedor, id_empleado, id_sucursal } = req.body;
    const query = 'UPDATE Compra SET fecha = ?, total = ?, id_proveedor = ?, id_empleado = ?, id_sucursal = ? WHERE id_compra = ?';
    db.query(query, [fecha, total, id_proveedor, id_empleado, id_sucursal, id], (err, result) => {
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

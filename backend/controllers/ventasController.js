const db = require('../config/db'); // Conexión a la base de datos

// Obtener todas las ventas
exports.obtenerVentas = (req, res) => {
    const query = 'SELECT * FROM venta';
    db.query(query, (err, results) => {  // Cambiado connection a db
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las ventas', error: err });
        }
        res.status(200).json(results);
    });
};

// Crear una nueva venta
exports.crearVenta = (req, res) => {
    const { fecha, total, id_cliente, id_empleado, id_sucursal, id_metodo_pago } = req.body;
    const query = 'INSERT INTO venta (fecha, total, id_cliente, id_empleado, id_sucursal, id_metodo_pago) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [fecha, total, id_cliente, id_empleado, id_sucursal, id_metodo_pago], (err, result) => {  // Cambiado connection a db
        if (err) {
            return res.status(500).json({ message: 'Error al insertar la venta', error: err });
        }
        res.status(201).json({ message: 'Venta insertada correctamente', id_venta: result.insertId });
    });
};

// Actualizar una venta existente
exports.actualizarVenta = (req, res) => {
    const { id } = req.params;
    const { fecha, total, id_cliente, id_empleado, id_sucursal, id_metodo_pago } = req.body;
    const query = 'UPDATE venta SET fecha = ?, total = ?, id_cliente = ?, id_empleado = ?, id_sucursal = ?, id_metodo_pago = ? WHERE id_venta = ?';

    db.query(query, [fecha, total, id_cliente, id_empleado, id_sucursal, id_metodo_pago, id], (err, result) => {  // Cambiado connection a db
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar la venta', error: err });
        }
        res.status(200).json({ message: 'Venta actualizada correctamente' });
    });
};

// Eliminar una venta
exports.eliminarVenta = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM venta WHERE id_venta = ?';

    db.query(query, [id], (err, result) => {  // Cambiado connection a db
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar la venta', error: err });
        }
        res.status(200).json({ message: 'Venta eliminada correctamente' });
    });
};

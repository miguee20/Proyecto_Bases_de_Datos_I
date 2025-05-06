const db = require('../config/db');

// Obtener todas las ventas
exports.obtenerVentas = (req, res) => {
    const query = 'SELECT * FROM venta';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error al obtener las ventas', error: err });
        res.status(200).json(results);
    });
};

// Crear una nueva venta (venta + detalle + actualización de stock)
exports.crearVenta = (req, res) => {
    const { fecha, total, id_cliente, id_empleado, id_sucursal, id_metodo_pago, productos } = req.body;

    // Verificamos que hayan productos en la venta
    if (!productos || productos.length === 0) {
        return res.status(400).json({ message: 'La venta debe contener al menos un producto' });
    }

    // Iniciar transacción
    db.beginTransaction(err => {
        if (err) return res.status(500).json({ message: 'Error al iniciar transacción', error: err });

        // Insertar venta
        const ventaQuery = 'INSERT INTO venta (fecha, total, id_cliente, id_empleado, id_sucursal, id_metodo_pago) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(ventaQuery, [fecha, total, id_cliente, id_empleado, id_sucursal, id_metodo_pago], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).json({ message: 'Error al insertar la venta', error: err });
                });
            }

            const id_venta = result.insertId;

            // Insertar detalles y actualizar stock
            const detallesQuery = 'INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)';
            const stockQuery = 'UPDATE producto SET stock = stock - ? WHERE id_producto = ?';

            let operaciones = productos.map(item => {
                return new Promise((resolve, reject) => {
                    db.query(detallesQuery, [id_venta, item.id_producto, item.cantidad, item.precio_unitario, item.subtotal], (err) => {
                        if (err) return reject(err);

                        // Actualizar stock
                        db.query(stockQuery, [item.cantidad, item.id_producto], (err) => {
                            if (err) return reject(err);
                            resolve();
                        });
                    });
                });
            });

            // Ejecutar todas las operaciones
            Promise.all(operaciones)
                .then(() => {
                    db.commit(err => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(500).json({ message: 'Error al confirmar transacción', error: err });
                            });
                        }
                        res.status(201).json({ message: 'Venta registrada correctamente', id_venta });
                    });
                })
                .catch(err => {
                    db.rollback(() => {
                        res.status(500).json({ message: 'Error al procesar productos de la venta', error: err });
                    });
                });
        });
    });
};

// Actualizar una venta (no toca productos ni stock en este caso)
exports.actualizarVenta = (req, res) => {
    const { id } = req.params;
    const { fecha, total, id_cliente, id_empleado, id_sucursal, id_metodo_pago } = req.body;
    const query = 'UPDATE venta SET fecha = ?, total = ?, id_cliente = ?, id_empleado = ?, id_sucursal = ?, id_metodo_pago = ? WHERE id_venta = ?';

    db.query(query, [fecha, total, id_cliente, id_empleado, id_sucursal, id_metodo_pago, id], (err) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar la venta', error: err });
        res.status(200).json({ message: 'Venta actualizada correctamente' });
    });
};

// Eliminar una venta
exports.eliminarVenta = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM venta WHERE id_venta = ?';

    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar la venta', error: err });
        res.status(200).json({ message: 'Venta eliminada correctamente' });
    });
};

// Obtener venta por ID
exports.getById = (id_venta, callback) => {
    const query = 'SELECT * FROM venta WHERE id_venta = ?';
    db.query(query, [id_venta], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results.length > 0 ? results[0] : null);
    });
};

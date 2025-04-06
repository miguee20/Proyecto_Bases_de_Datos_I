const db = require('../config/db');

// Obtener todos los clientes
exports.obtenerClientes = (req, res) => {
    db.query('SELECT * FROM Cliente', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al obtener clientes');
        }
        res.json(result);
    });
};

// Crear un nuevo cliente
exports.crearCliente = async (req, res) => {
    try {
        const { nombre, apellido, nit, telefono, email, direccion } = req.body;
        const sql = 'INSERT INTO cliente (nombre, apellido, nit, telefono, email, direccion) VALUES (?, ?, ?, ?, ?, ?)';
        
        db.query(sql, [nombre, apellido, nit, telefono, email, direccion], (error, results) => {
            if (error) {
                console.error("❌ Error en la consulta SQL:", error);
                return res.status(500).json({ mensaje: "Error al crear el cliente", error });
            }
            res.status(201).json({ mensaje: "Cliente creado correctamente", id: results.insertId });
        });
    } catch (err) {
        console.error("❌ Error inesperado:", err);
        res.status(500).json({ mensaje: "Error inesperado", error: err });
    }
};

// Actualizar un cliente
exports.actualizarCliente = (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono, email } = req.body;
    const query = 'UPDATE Cliente SET nombre = ?, direccion = ?, telefono = ?, email = ? WHERE id_cliente = ?';
    db.query(query, [nombre, direccion, telefono, email, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al actualizar el cliente');
        }
        res.send('Cliente actualizado correctamente');
    });
};

// Eliminar un cliente
exports.eliminarCliente = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Cliente WHERE id_cliente = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al eliminar el cliente');
        }
        res.send('Cliente eliminado correctamente');
    });
};

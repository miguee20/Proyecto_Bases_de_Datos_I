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
exports.crearCliente = (req, res) => {
    const { nombre, direccion, telefono, email } = req.body;
    const query = 'INSERT INTO Cliente (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, direccion, telefono, email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al crear el cliente');
        }
        res.status(201).send('Cliente creado correctamente');
    });
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

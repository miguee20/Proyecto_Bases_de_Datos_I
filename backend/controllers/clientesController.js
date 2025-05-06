const db = require('../config/db');

// Obtener todos los clientes
exports.obtenerClientes = (req, res) => {
    db.query('SELECT * FROM cliente', (err, result) => {
        if (err) {
            console.error("❌ Error al obtener clientes:", err);
            return res.status(500).json({ mensaje: 'Error al obtener clientes', error: err });
        }
        res.json(result);
    });
};

// Crear un nuevo cliente
exports.crearCliente = (req, res) => {
    const { nombre, apellido, nit, telefono, email, direccion } = req.body;

    if (!nombre || !apellido) {
        return res.status(400).json({ mensaje: "Los campos 'nombre' y 'apellido' son obligatorios." });
    }

    const sql = 'INSERT INTO cliente (nombre, apellido, nit, telefono, email, direccion) VALUES (?, ?, ?, ?, ?, ?)';
    const valores = [nombre, apellido, nit, telefono, email, direccion];

    db.query(sql, valores, (error, results) => {
        if (error) {
            console.error("❌ Error en la consulta SQL al crear cliente:", error);
            return res.status(500).json({ mensaje: "Error al crear el cliente", error });
        }
        res.status(201).json({ mensaje: "Cliente creado correctamente", id_cliente: results.insertId });
    });
};

// Actualizar un cliente
exports.actualizarCliente = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, nit, direccion, telefono, email } = req.body;

    if (!nombre || !apellido) {
        return res.status(400).json({ mensaje: "Los campos 'nombre' y 'apellido' son obligatorios." });
    }

    const sql = 'UPDATE cliente SET nombre = ?, apellido = ?, nit = ?, direccion = ?, telefono = ?, email = ? WHERE id_cliente = ?';
    const valores = [nombre, apellido, nit, direccion, telefono, email, id];

    db.query(sql, valores, (error, result) => {
        if (error) {
            console.error("❌ Error en la consulta SQL al actualizar cliente:", error);
            return res.status(500).json({ mensaje: "Error al actualizar el cliente", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Cliente no encontrado para actualizar" });
        }
        res.json({ mensaje: "Cliente actualizado correctamente" });
    });
};

// Eliminar un cliente
exports.eliminarCliente = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM cliente WHERE id_cliente = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.error("❌ Error en la consulta SQL al eliminar cliente:", error);
            return res.status(500).json({ mensaje: "Error al eliminar el cliente", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Cliente no encontrado para eliminar" });
        }
        res.json({ mensaje: "Cliente eliminado correctamente" });
    });
};

// Obtener un cliente por ID
exports.obtenerClientePorId = (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM cliente WHERE id_cliente = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            console.error("❌ Error en la consulta SQL al obtener cliente por ID:", error);
            return res.status(500).json({ mensaje: "Error al obtener el cliente", error });
        }
        if (result.length === 0) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }
        res.json(result[0]);
    });
};

const proveedorModel = require('../models/proveedorModel');

// GET /api/proveedores
const obtenerProveedores = (req, res) => {
    proveedorModel.obtenerProveedores((err, proveedores) => {
        if (err) return res.status(500).json({ error: 'Error al obtener proveedores' });
        res.json(proveedores);
    });
};

// GET /api/proveedores/:id
const obtenerProveedorPorId = (req, res) => {
    const id = req.params.id;
    proveedorModel.obtenerProveedorPorId(id, (err, proveedor) => {
        if (err) return res.status(404).json({ error: 'Proveedor no encontrado' });
        res.json(proveedor);
    });
};

// POST /api/proveedores
const crearProveedor = (req, res) => {
    const data = req.body;
    proveedorModel.crearProveedor(data, (err, nuevoProveedor) => {
        if (err) return res.status(500).json({ error: 'Error al crear proveedor' });
        res.status(201).json(nuevoProveedor);
    });
};

// PUT /api/proveedores/:id
const actualizarProveedor = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    proveedorModel.actualizarProveedor(id, data, (err, proveedorActualizado) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar proveedor' });
        res.json(proveedorActualizado);
    });
};

// DELETE /api/proveedores/:id
const eliminarProveedor = (req, res) => {
    const id = req.params.id;
    proveedorModel.eliminarProveedor(id, (err, resultado) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar proveedor' });
        res.json({ mensaje: 'Proveedor eliminado correctamente' });
    });
};

module.exports = {
    obtenerProveedores,
    obtenerProveedorPorId,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
};

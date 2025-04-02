const proveedorModel = require('../models/proveedorModel');

// Obtener todos los proveedores
const obtenerProveedores = (req, res) => {
    proveedorModel.obtenerProveedores((err, proveedores) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los proveedores' });
        res.json(proveedores);
    });
};

// Obtener un proveedor por ID
const obtenerProveedorPorId = (req, res) => {
    const { id } = req.params;
    proveedorModel.obtenerProveedorPorId(id, (err, proveedor) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el proveedor' });
        if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
        res.json(proveedor);
    });
};

// Crear un nuevo proveedor
const crearProveedor = (req, res) => {
    const { nombre, direccion, telefono, email } = req.body;
    proveedorModel.crearProveedor({ nombre, direccion, telefono, email }, (err, proveedor) => {
        if (err) return res.status(500).json({ error: 'Error al crear proveedor' });
        res.status(201).json(proveedor);
    });
};

// Actualizar un proveedor
const actualizarProveedor = (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono, email } = req.body;
    proveedorModel.actualizarProveedor(id, { nombre, direccion, telefono, email }, (err, proveedor) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar proveedor' });
        res.json(proveedor);
    });
};

// Eliminar un proveedor
const eliminarProveedor = (req, res) => {
    const { id } = req.params;
    proveedorModel.eliminarProveedor(id, (err) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar proveedor' });
        res.status(204).json({ message: 'Proveedor eliminado correctamente' });
    });
};

module.exports = {
    obtenerProveedores,
    obtenerProveedorPorId,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
};

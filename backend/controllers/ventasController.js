const db = require('../config/db');

// Obtener métodos de pago
async function obtenerMetodosPago(req, res) {
  try {
    console.log('Entrando a obtenerMetodosPago...');
    const [result] = await db.query('SELECT * FROM metodo_pago');
    console.log('Resultado:', result);
    res.json(result);
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({
      mensaje: 'Error al obtener métodos de pago',
      error: error.message,
      stack: error.stack
    });
  }
}

// Crear una venta
const registrarVenta = async (req, res) => {
  console.log('Datos recibidos en registrarVenta:', req.body);
  const { id_cliente, productos, id_empleado = 1, id_sucursal = 1, id_metodo_pago = 1 } = req.body;

  if (!id_cliente || !productos || productos.length === 0) {
    return res.status(400).json({ mensaje: 'Datos incompletos' });
  }

  try {
    // Calcular total
    let total = 0;
    productos.forEach(p => {
      total += p.cantidad * p.precio_unitario;
    });

    // Insertar cada producto como una fila en la tabla venta
    for (const p of productos) {
      const subtotal = p.cantidad * p.precio_unitario;

      const sql = `
        INSERT INTO venta(fecha, total, id_cliente, id_empleado, id_sucursal, id_metodo_pago, estado,
                          id_producto, cantidad, precio_unitario, subtotal, cantidad_devuelta)
        VALUES (CURDATE(), ?, ?, ?, ?, ?, 'completada', ?, ?, ?, ?, 0)
      `;

      await db.query(sql, [
        total,
        id_cliente,
        id_empleado,
        id_sucursal,
        id_metodo_pago,
        p.id_producto,
        p.cantidad,
        p.precio_unitario,
        subtotal
      ]);
    }

    res.status(201).json({ mensaje: 'Venta registrada correctamente' });

  } catch (error) {
    console.error('Error al registrar la venta:', error);
    res.status(500).json({ mensaje: 'Error al registrar la venta' });
  }
};

// Obtener todas las ventas (con cliente y total)
function obtenerVentas(req, res) {
  db.query(`
    SELECT 
      venta.id_venta, 
      cliente.nombre AS nombre_cliente, 
      producto.nombre AS nombre_producto, 
      producto.precio AS precio_unitario,
      venta.cantidad, 
      (producto.precio * venta.cantidad) AS total,
      venta.fecha 
    FROM venta 
    INNER JOIN cliente ON cliente.id_cliente = venta.id_cliente 
    INNER JOIN producto ON producto.id_producto = venta.id_producto 
    ORDER BY venta.id_venta ASC
  `, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error al obtener ventas' });
    }
    res.json(results);
  });
}

// Eliminar una venta (y restaurar stock)
const eliminarVenta = async (req, res) => {
  const { id } = req.params;
  const conexion = await db.getConnection();
  try {
    await db.beginTransaction();

    const [detalles] = await conexion.query(
      'SELECT id_producto, cantidad FROM venta WHERE id_venta = ?',
      [id]
    );

    for (const d of detalles) {
      await conexion.query(
        'UPDATE producto SET stock = stock + ? WHERE id_producto = ?',
        [d.cantidad, d.id_producto]
      );
    }

    await conexion.query('DELETE FROM venta WHERE id_venta = ?', [id]);

    await db.commit();
    res.json({ mensaje: 'Venta eliminada correctamente' });
  } catch (error) {
    await conexion.rollback();
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la venta' });
  } finally {
    //conexion.release();
  }
};

// Editar una venta (cambia productos, total y actualiza stock)
const editarVenta = async (req, res) => {
  const { id } = req.params;
  const { id_cliente, productos } = req.body;

  if (!id_cliente || !productos || productos.length === 0) {
    return res.status(400).json({ mensaje: 'Datos incompletos' });
  }

  const conexion = await db.getConnection();
  try {
    await db.beginTransaction();

    // Restaurar stock anterior
    const [detallesAntiguos] = await conexion.query(
      'SELECT id_producto, cantidad FROM venta WHERE id_venta = ?',
      [id]
    );
    for (const d of detallesAntiguos) {
      await conexion.query(
        'UPDATE producto SET stock = stock + ? WHERE id_producto = ?',
        [d.cantidad, d.id_producto]
      );
    }

    // Borrar detalles antiguos
    await conexion.query('DELETE FROM venta WHERE id_venta = ?', [id]);

    // Insertar nuevos detalles
    let total = 0;
    for (const p of productos) {
      const subtotal = p.cantidad * p.precio_unitario;
      total += subtotal;

      await conexion.query(
        'INSERT INTO venta (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
        [id, p.id_producto, p.cantidad, p.precio_unitario, subtotal]
      );

      await conexion.query(
        'UPDATE producto SET stock = stock - ? WHERE id_producto = ?',
        [p.cantidad, p.id_producto]
      );
    }

    // Actualizar venta
    await conexion.query(
      'UPDATE venta SET total = ?, id_cliente = ? WHERE id_venta = ?',
      [total, id_cliente, id]
    );

    await db.commit();
    res.json({ mensaje: 'Venta actualizada correctamente' });
  } catch (error) {
    await conexion.rollback();
    console.error(error);
    res.status(500).json({ mensaje: 'Error al editar la venta' });
  } finally {
    //conexion.release();
  }
};

// En ventasController.js
const obtenerVentaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [venta] = await db.query(
      `SELECT v.id_venta, v.fecha, v.total, v.id_cliente, c.nombre AS cliente
       FROM venta v
       JOIN cliente c ON v.id_cliente = c.id_cliente
       WHERE v.id_venta = ?`,
      [id]
    );

    const [detalles] = await db.query(
      `SELECT dv.id_producto, p.nombre, dv.cantidad, dv.precio_unitario, dv.subtotal
       FROM venta dv
       JOIN producto p ON dv.id_producto = p.id_producto
       WHERE dv.id_venta = ?`,
      [id]
    );

    res.json({ venta: venta[0], productos: detalles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la venta' });
  }
};



module.exports = {
  registrarVenta,
  obtenerVentas,
  eliminarVenta,
  editarVenta,
  obtenerVentaPorId
};
const bcrypt = require('bcrypt');
const connection = require('./config/db');

const actualizarPassword = async () => {
  const contraseñaOriginal = 'admin123';
  const hash = await bcrypt.hash(contraseñaOriginal, 10);

  const sql = 'UPDATE usuario SET contraseña = ? WHERE nombre_usuario = "admin"';
  connection.query(sql, [hash], (err, result) => {
    if (err) throw err;
    console.log('Contraseña actualizada con bcrypt');
    process.exit(); // terminar proceso
  });
};

actualizarPassword();

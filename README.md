# Tienda de Fragancias

Este proyecto es una aplicación completa para la gestión de una tienda de fragancias. Permite manejar información sobre productos, proveedores, clientes, compras, ventas y devoluciones a través de una API RESTful. Además, el frontend será desarrollado con **HTML** y **CSS** para proporcionar una interfaz fácil de usar.

## Descripción

La aplicación está diseñada para gestionar todas las operaciones de una tienda de fragancias, desde la administración de inventarios hasta la gestión de proveedores, clientes y transacciones de compra y venta. 

El sistema ofrece operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) para productos, proveedores, clientes y otros recursos clave. Utiliza **MariaDB** como base de datos para almacenar la información de manera segura y eficiente.

## Tecnologías Utilizadas 🛠️

- **Node.js**: Para ejecutar el backend de la aplicación.
- **Express.js**: Framework web para la construcción de la API RESTful.
- **MariaDB**: Base de datos relacional para almacenar la información.
- **HTML y CSS**: Para la creación del frontend de la aplicación.

## Estructura de Rutas 🚀

La aplicación cuenta con las siguientes rutas para gestionar los diferentes recursos:

- **/api/productos**: Rutas para la gestión de productos (CRUD).
- **/api/proveedores**: Rutas para la gestión de proveedores (CRUD).
- **/api/clientes**: Rutas para la gestión de clientes (CRUD).
- **/api/compras**: Rutas para registrar y consultar compras realizadas.
- **/api/ventas**: Rutas para registrar y consultar ventas realizadas.
- **/api/devoluciones**: Rutas para registrar y consultar devoluciones de productos.

## Conexión a la Base de Datos 🔗

La aplicación se conecta a una base de datos **MariaDB**. Se ha configurado un archivo `.env` para manejar las variables de entorno, tales como las credenciales de la base de datos.

Ejemplo de archivo `.env`:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=fragancia
DB_PORT=3307

## Instrucciones para Ejecutar el Proyecto 🏃‍♂️
Clona este repositorio:

git clone https://github.com/tu-usuario/tienda-fragancias.git
cd tienda-fragancias

# Instala las dependencias:

npm install

# Configura tu archivo .env con las credenciales de la base de datos.

Inicia el servidor:

node backend/server.js

El servidor debería estar corriendo en http://localhost:5000.

# Recordar que el puerto de la base de datos es el 3307 (agregar al path de mariadb)

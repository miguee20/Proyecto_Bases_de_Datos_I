Perfumería - Instalación y Configuración
Este proyecto es un sistema de gestión para una perfumería, desarrollado con Node.js, Express, MariaDB y un frontend en HTML/CSS. A continuación, se detallan los pasos para instalar y configurar el entorno de desarrollo.

📌 Requisitos Previos
Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu computadora:

Node.js (versión recomendada: LTS)
MariaDB (para la base de datos)
Git (para clonar el repositorio)
Un editor de código (Ejemplo: VS Code)
📂 Clonar el Proyecto
Ve a la página del repositorio en GitHub Web.
Haz clic en el botón "Code" y selecciona "Download ZIP" para descargar el proyecto.
Extrae el archivo .zip en una carpeta en tu computadora.
🔧 Instalación del Backend
Abrir VS Code y la terminal:

Abre VS Code y selecciona la carpeta perfumeria.
Abre la terminal en VS Code (Ver → Terminal o usa Ctrl + ñ).
Instalar dependencias ejecutando en la terminal:

sh
Copiar
Editar
npm install express cors dotenv mysql2
Esto instalará:

express → Framework para el servidor.
cors → Permite comunicación entre frontend y backend.
dotenv → Manejo de variables de entorno.
mysql2 → Conector para MariaDB/MySQL.
Crear el archivo de configuración .env:

Dentro de la carpeta perfumeria, crea un archivo llamado .env y agrega:
env
Copiar
Editar
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=fragancia
Reemplaza tu_contraseña con la contraseña de tu base de datos.
Ejecutar el servidor:

sh
Copiar
Editar
npm start
Si todo está bien, deberías ver:

csharp
Copiar
Editar
🚀 Servidor corriendo en http://localhost:5000
✅ Conexión exitosa a la base de datos
🛢️ Instalación de la Base de Datos
Abrir MariaDB o un gestor como phpMyAdmin.
Crear la base de datos manualmente con:
sql
Copiar
Editar
CREATE DATABASE fragancia;
Importar la estructura y datos:
En la carpeta database, encontrarás un archivo llamado fragancia.sql.
Impórtalo en tu gestor de base de datos (phpMyAdmin o desde la línea de comandos).
🎨 Instalación del Frontend
Abre la carpeta frontend.
Abre el archivo index.html en un navegador.
Para hacer cambios, edita los archivos dentro de frontend.
🚀 Ejecución del Proyecto
Inicia el backend con:
sh
Copiar
Editar
npm start
Abre el frontend (frontend/index.html).
Si todo está correcto, deberías poder ver los productos y gestionarlos desde la interfaz web.


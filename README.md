# Perfumería - Instalación y Configuración
Este proyecto es un sistema de gestión para una perfumería, desarrollado con Node.js, Express, MariaDB y un frontend en HTML/CSS. A continuación, se detallan los pasos para instalar y configurar el entorno de desarrollo.

# 📌 Requisitos Previos
Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu computadora:

- Node.js (versión recomendada: LTS)
- MariaDB (para la base de datos)
- Git (para clonar el repositorio)
- Un editor de código (Ejemplo: VS Code)

# 📂 Clonar el Proyecto
Hagan una carpeta que se llame "perfumeria" adentro descarguen los archivos de backend y metanlos ahi. Luego, hagan una carpeta que se llame frontend y metan ahi esos archivos, descarguen de una el fragancia.sql tambien

# 🔧 Instalación del Backend
1. Abrir VS Code y la Terminal
Abre VS Code y selecciona la carpeta perfumeria.
Abre la terminal en VS Code (Ver → Terminal o usa Ctrl + ñ).
2. Instalar Dependencias
Ejecuta el siguiente comando en la terminal:

npm install express cors dotenv mysql2

Esto instalará las siguientes dependencias:

express → Framework para el servidor.

cors → Permite comunicación entre frontend y backend.

dotenv → Manejo de variables de entorno.

mysql2 → Conector para MariaDB/MySQL.

3. Crear el Archivo de Configuración .env
Dentro de la carpeta perfumeria, crea un archivo llamado .env y agrega la siguiente configuración:

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=tu_contraseña

DB_NAME=fragancia

Reemplaza tu_contraseña con la contraseña de tu base de datos

5. Ejecutar el Servidor
Ejecuta el siguiente comando para iniciar el servidor:

npm start

Si todo está bien, deberías ver:

🚀 Servidor corriendo en http://localhost:5000
✅ Conexión exitosa a la base de datos

# 🛢️ Instalación de la Base de Datos
1. Abre MariaDB o un gestor (cmd)
2. Crea la base de datos manualmente con el siguiente comando:

CREATE DATABASE fragancia;

3. Importa la estructura y datos:
- En la carpeta database, encontrarás un archivo llamado fragancia.sql.
- Impórtalo en tu gestor de base de datos (desde la línea de comandos).


# 🎨 Instalación del Frontend
- Abre la carpeta frontend.
- Abre el archivo index.html en un navegador.
Para hacer cambios, edita los archivos dentro de la carpeta frontend.

# 🚀 Ejecución del Proyecto
Inicia el backend con el siguiente comando:

npm start

Abre el frontend accediendo a frontend/index.html en tu navegador.

Si todo está correcto, deberías poder ver los productos y gestionarlos desde la interfaz web.

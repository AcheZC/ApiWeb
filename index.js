const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Configuración
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = require('./db');

// Rutas
const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

// Inicio del servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

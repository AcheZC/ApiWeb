require('dotenv').config();
const express = require('express');
const app = express();
const usuariosRoutes = require('./routes/usuarios');

// Middleware para permitir JSON
app.use(express.json());

// Rutas
app.use('/usuarios', usuariosRoutes);

// Puerto desde .env o por defecto 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

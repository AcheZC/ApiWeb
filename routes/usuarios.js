const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los usuarios
router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('🛑 Error al obtener los usuarios:', err);
            return res.status(500).json({ error: { fatal: true, detalle: err.message } });
        }
        res.json(results);
    });
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(`🛑 Error al obtener el usuario con ID ${id}:`, err);
            return res.status(500).json({ error: { fatal: true, detalle: err.message } });
        }
        if (results.length === 0) {
            console.warn(`⚠️ Usuario con ID ${id} no encontrado`);
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(results[0]);
    });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
    const { nombre_usuario, nombre, apellido } = req.body;
    const nuevoUsuario = { nombre_usuario, nombre, apellido };

    db.query('INSERT INTO usuarios SET ?', nuevoUsuario, (err, result) => {
        if (err) {
            console.error('🛑 Error al crear el usuario:', err);
            return res.status(500).json({ error: { fatal: true, detalle: err.message } });
        }
        res.status(201).json({ id: result.insertId, ...nuevoUsuario });
    });
});

// Actualizar un usuario existente
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { nombre_usuario, nombre, apellido } = req.body;
    const datosActualizados = { nombre_usuario, nombre, apellido };

    db.query('UPDATE usuarios SET ? WHERE id = ?', [datosActualizados, id], (err) => {
        if (err) {
            console.error(`🛑 Error al actualizar el usuario con ID ${id}:`, err);
            return res.status(500).json({ error: { fatal: true, detalle: err.message } });
        }
        res.json({ id, ...datosActualizados });
    });
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(`🛑 Error al eliminar el usuario con ID ${id}:`, err);
            return res.status(500).json({ error: { fatal: true, detalle: err.message } });
        }
        res.json({ mensaje: 'Usuario eliminado exitosamente' });
    });
});

module.exports = router;

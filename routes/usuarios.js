const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los usuarios
router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error al obtener los usuarios:', err);
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        res.json(results);
    });
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            return res.status(500).json({ error: 'Error al obtener el usuario' });
        }
        if (results.length === 0) {
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
            console.error('Error al crear el usuario:', err);
            return res.status(500).json({ error: 'Error al crear el usuario' });
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
            console.error('Error al actualizar el usuario:', err);
            return res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
        res.json({ id, ...datosActualizados });
    });
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
        res.json({ mensaje: 'Usuario eliminado exitosamente' });
    });
});

module.exports = router;

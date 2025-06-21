const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los usuarios
router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ mensaje: 'No encontrado' });
        res.json(results[0]);
    });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
    const { nombre, correo } = req.body;
    if (!nombre || !correo) return res.status(400).json({ mensaje: 'Faltan datos' });

    db.query('INSERT INTO usuarios (nombre, correo) VALUES (?, ?)', [nombre, correo], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: result.insertId, nombre, correo });
    });
});

// Actualizar un usuario
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;

    db.query('UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?', [nombre, correo, id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ mensaje: 'Usuario actualizado' });
    });
});

// Borrar un usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ mensaje: 'Usuario eliminado' });
    });
});

module.exports = router;

const mongoose = require("mongoose");
const Day = require("../models/Day");

const findById = async (req, res) => {
    
    try {
        let dayDoc = await Day.findOne({});
        if (!dayDoc) {
            return res.status(404).json({ error: 'day no encontrados' });
        }
        res.status(200).json(dayDoc);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const create = async (req, res) => {

    try {
        dayDoc = new Day();
        await dayDoc.save();
        res.status(201).json(dayDoc.lastReset);

    } catch (error) {
        console.error('Error al guardar dia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const update = async (req, res) => {

    try {
        let dayDoc = await Day.findOne({});
        const now = new Date();
        dayDoc.lastReset = `${now.getFullYear()},${now.getMonth() + 1},${now.getDate()}`;
        await dayDoc.save();
        res.status(201).json(dayDoc.lastReset);

    } catch (error) {
        console.error('Error al update dia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = { findById, create, update };
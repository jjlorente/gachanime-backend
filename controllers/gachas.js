const mongoose = require("mongoose");
const Gacha = require("../models/Gacha");

const addGacha = async (req, res) => {
    const { userId, gachas  } = req.body;

    try {
        let newGacha = new Gacha({
            userid: userId,
            gachas: gachas,
            throws: 0
        });

        const savedGacha = await newGacha.save();
        res.status(201).json(savedGacha);

    } catch (error) {
        console.error('Error al guardar gachas del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const findById = async (req, res) => {
    const { id } = req.query; 
    
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        const gachas = await Gacha.findOne({ userid: id });
        if (!gachas) {
            return res.status(404).json({ error: 'Gachas no encontrados' });
        }
        res.status(200).json(gachas);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { addGacha, findById };
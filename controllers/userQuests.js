const mongoose = require("mongoose");
const UserQuests = require("../models/UserQuest");

const findById = async (req, res) => {
    const { id } = req.query; 
    
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        const userQuests = await UserQuests.findOne({ userid: id });
        if (!userQuests) {
            return res.status(404).json({ error: 'Quests no encontradas' });
        }
        res.status(200).json(userQuests);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const addNewQuestsUser = async (req, res) => {
    const { userId  } = req.body;

    try {
        let newUserQuests = new UserQuests({
            userid: userId,
            statusQuestImage: 0,
            statusQuestSilueta: 0,
            statusQuestName: 0,
            statusQuestOpening: 0,
            statusQuestAllGames: 0
        });

        const savedUserQuests = await newUserQuests.save();
        res.status(201).json(savedUserQuests);

    } catch (error) {
        console.error('Error al guardar savedUserQuests del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = { findById, addNewQuestsUser };
const mongoose = require("mongoose");
const UserQuests = require("../models/UserQuest");
const Quest = require("../models/Quest");
const UserGames = require("../models/UserGames");
const Gachas = require("../models/Gacha");

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

const findAllQuests = async (req, res) => {
    try {
        const quests = await Quest.find({});

        if (!quests || quests.length === 0) {
            return res.status(404).json({ error: 'Quests no encontradas' });
        }

        res.status(200).json(quests);
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

const updateClaimReward = async (req, res) => {
    const { userid, gachas, game } = req.body;
    try {
        const userQuest = await UserQuests.findOne({ userid: userid });
        const userGacha = await Gachas.findOne({ userid: userid });

        if (!userQuest || !userGacha) {
            return res.status(404).json({ error: 'userQuest no encontrado o gacha' });
        }

        if (userQuest && userGacha) {
            if (game==="image") {
                userQuest.statusQuestImage = 2;
            } else if (game==="silueta") {
                userQuest.statusQuestSilueta = 2;
            } else if (game==="name") {
                userQuest.statusQuestName = 2;
            } else if (game==="opening") {
                userQuest.statusQuestOpening = 2;
            } else if (game==="all") {
                userQuest.statusQuestAllGames = 5;
            } 

            userGacha.gachas = userGacha.gachas + gachas;
            await userQuest.save();
            await userGacha.save();
            res.status(200).json([userQuest, userGacha]);
        }

    } catch (error) {
        console.error('Error al recuperar el userGame:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { findById, addNewQuestsUser, findAllQuests, updateClaimReward };
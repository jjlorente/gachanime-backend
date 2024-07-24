const mongoose = require("mongoose");
const UserGames = require("../models/UserGames");
const Game = require("../models/Game");

const findById = async (req, res) => {
    const { id } = req.query; 
    
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        const userGames = await UserGames.findOne({ userid: id });
        if (!userGames) {
            return res.status(404).json({ error: 'Games no encontradas' });
        }
        res.status(200).json(userGames);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const findGameImageById = async (req, res) => {
    const { id } = req.query; 
    
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        const game = await Game.findOne({ _id: id });
        if (!game) {
            return res.status(404).json({ error: 'Game no encontrado' });
        }
        res.status(200).json(game);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const findRandomGame = async () => {
    try {
        const game = await Game.aggregate([{ $sample: { size: 1 } }]);
        return game.length > 0 ? game[0] : null;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const addNewGamesUser = async (req, res) => {
    const { userId  } = req.body;

    try {
        const randomNameGame = await findRandomGame();
        const randomImageGame = await findRandomGame();

        let newUserGames = new UserGames({
            userid: userId,
            nameid: randomNameGame._id,
            imageid: randomImageGame._id,
            triesname: 0,
            triesimage: 0,
            resets: 5
        });

        const savedUserGames = await newUserGames.save();
        res.status(201).json(savedUserGames);

    } catch (error) {
        console.error('Error al guardar savedUserGames del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = { findById, findGameImageById, addNewGamesUser };
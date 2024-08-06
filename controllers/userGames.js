const mongoose = require("mongoose");
const UserGames = require("../models/UserGames");
const Game = require("../models/Game");
const Gachas = require("../models/Gacha");

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
            resets: 5,
            finishedImage: false,
            finishedName: false,
            statusRewardImage: 0,
            statusRewardName: 0
        });

        const savedUserGames = await newUserGames.save();
        res.status(201).json(savedUserGames);

    } catch (error) {
        console.error('Error al guardar savedUserGames del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const updateImageGame = async (req, res) => {
    const { userid, finishedImage, resets, triesimage, statusRewardImage } = req.body;
    try {
        const userGame = await UserGames.findOne({ userid: userid });
        
        if (!userGame) {
            return res.status(404).json({ error: 'UserGame no encontrado' });
        }

        if (userGame) {
            userGame.finishedImage = finishedImage;
            userGame.resets = userGame.resets + resets;
            userGame.triesimage = userGame.triesimage + triesimage;
            userGame.statusRewardImage = statusRewardImage;
            await userGame.save();
            res.status(200).json(userGame);
        }

    } catch (error) {
        console.error('Error al recuperar el userGame:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateImageSelected = async (req, res) => {
    const { userid, numImage } = req.body;
    try {
        const userGame = await UserGames.findOne({ userid: userid });
        
        if (!userGame) {
            return res.status(404).json({ error: 'UserGame no encontrado' });
        }

        if (userGame) {
            userGame.imageSelected = numImage;
            await userGame.save();
            res.status(200).json(userGame);
        }

    } catch (error) {
        console.error('Error al recuperar el userGame:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateClaimImageReward = async (req, res) => {
    const { userid, gachas, status } = req.body;
    try {
        const userGame = await UserGames.findOne({ userid: userid });
        const userGacha = await Gachas.findOne({ userid: userid });

        if (!userGame || !userGacha) {
            return res.status(404).json({ error: 'UserGame no encontrado o gacha' });
        }

        if (userGame && userGacha) {
            userGame.statusRewardImage = status;
            userGacha.gachas = userGacha.gachas + gachas;
            await userGame.save();
            await userGacha.save();
            res.status(200).json([userGame, userGacha]);
        }

    } catch (error) {
        console.error('Error al recuperar el userGame:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const resetDailyGames = async (req, res) => {
    try {
        await UserGames.deleteMany({});
        res.status(200).json("Reset");
    } catch (err) {
        console.error('Error deleting documents:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const resetGame = async (req, res) => {
    const { userid, game } = req.body;
    try {
        const userGame = await UserGames.findOne({ userid: userid });
        let randomGame = await findRandomGame();
        let differentAnime = false;

        while(differentAnime === false) {
            if(game === "image") {
                if(randomGame._id.toString() === userGame.imageid.toString()) {
                    randomGame = await findRandomGame();
                } else {
                    differentAnime = true;
                }
            } else if (game==="name") {
                if(randomGame._id === userGame.nameid) {
                    randomGame = await findRandomGame();
                } else {
                    differentAnime = true;
                }
            }
        }

        if (!userGame) {
            return res.status(404).json({ error: 'UserGame no encontrado o gacha' });
        }

        if (userGame) {
            if(game === "image") {
                userGame.imageid = randomGame._id;
            } else if (game === "name") {
                userGame.nameid = randomGame._id;
            }
            userGame.resets = userGame.resets - 1;
            await userGame.save();
            res.status(200).json(userGame);
        }

    } catch (error) {
        console.error('Error al recuperar el userGame:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { findById, findGameImageById, addNewGamesUser, updateImageGame, updateClaimImageReward, resetGame, updateImageSelected, resetDailyGames };
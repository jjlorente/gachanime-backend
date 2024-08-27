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

const findCharactersNames = async (req, res) => {

    try {
        const games = await Game.find({}, 'names_game');
        if (!games) {
            return res.status(404).json({ error: 'Games no encontradas' });
        }
        res.status(200).json(games);
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
        const randomSiluetaGame = await findRandomGame();

        let newUserGames = new UserGames({
            userid: userId,
            nameid: randomNameGame._id,
            imageid: randomImageGame._id,
            siluetaid: randomSiluetaGame._id,
            triesname: 0,
            triesimage: 0,
            triessilueta: 0,
            resets: 5,
            finishedImage: false,
            finishedName: false,
            finishedSilueta: false,
            statusRewardImage: 0,
            statusRewardSilueta: 0,
            statusRewardName: 0
        });

        const savedUserGames = await newUserGames.save();
        res.status(201).json(savedUserGames);

    } catch (error) {
        console.error('Error al guardar savedUserGames del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const updateGame = async (req, res) => {
    const { userid, finished, resets, tries, statusReward, game } = req.body;
    try {
        const userGame = await UserGames.findOne({ userid: userid });
        
        if (!userGame) {
            return res.status(404).json({ error: 'UserGame no encontrado' });
        }

        if (userGame) {
            if (game==="image") {
                userGame.finishedImage = finished;
                userGame.triesimage = userGame.triesimage + tries;
                userGame.statusRewardImage = statusReward;
            } else if (game==="silueta") {
                userGame.finishedSilueta = finished;
                userGame.triessilueta = userGame.triessilueta + tries;
                userGame.statusRewardSilueta = statusReward;
            } else if (game==="name") {
                userGame.finishedName = finished;
                userGame.triesname = userGame.triesname + tries;
                userGame.statusRewardName = statusReward;
            }
            
            userGame.resets = userGame.resets + resets;
            await userGame.save();
            res.status(200).json(userGame);
        }

    } catch (error) {
        console.error('Error al recuperar el userGame:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateSelected = async (req, res) => {
    const { userid, num, game } = req.body;
    try {
        const userGame = await UserGames.findOne({ userid: userid });
        
        if (!userGame) {
            return res.status(404).json({ error: 'UserGame no encontrado' });
        }

        if (userGame) {
            if(game==="image") {
                userGame.imageSelected = num;
            } else if(game==="silueta") {
                userGame.siluetaSelected = num;
            } else if(game==="name") {
                userGame.nameSelected = num;
            }
            
            await userGame.save();
            res.status(200).json(userGame);
        }

    } catch (error) {
        console.error('Error al recuperar el userGame:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateClaimReward = async (req, res) => {
    const { userid, gachas, status, game } = req.body;
    try {
        const userGame = await UserGames.findOne({ userid: userid });
        const userGacha = await Gachas.findOne({ userid: userid });

        if (!userGame || !userGacha) {
            return res.status(404).json({ error: 'UserGame no encontrado o gacha' });
        }

        if (userGame && userGacha) {
            if(game==="image") {
                userGame.statusRewardImage = status;
            } else if(game==="silueta") {
                userGame.statusRewardSilueta = status;
            } else if(game==="name") {
                userGame.statusRewardName = status;
            }
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
            } else if (game==="silueta") {
                if(randomGame._id.toString() === userGame.siluetaid.toString()) {
                    randomGame = await findRandomGame();
                } else {
                    differentAnime = true;
                }
            } else if (game==="name") {
                if(randomGame._id.toString() === userGame.nameid.toString()) {
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
            } else if (game === "silueta") {
                userGame.siluetaid = randomGame._id;
            } else if (game === "name") {
                userGame.nameid = randomGame._id;
                userGame.triesname = userGame.triesname - userGame.triesname;
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

module.exports = { findById, findGameImageById, addNewGamesUser, updateGame, updateClaimReward, resetGame, updateSelected, resetDailyGames, findCharactersNames };
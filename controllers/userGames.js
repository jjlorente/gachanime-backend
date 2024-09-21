const mongoose = require("mongoose");
const UserGames = require("../models/UserGames");
const Game = require("../models/Game");
const Gachas = require("../models/Gacha");
const UserQuests = require("../models/UserQuest");

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

const findRandomGame = async (gameType, mode) => {
    try {
        let game;
        if (mode === 0) {

            if (gameType === "image") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.image_game);
            } else if (gameType === "silueta") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.silueta_game); 
            } else if (gameType === "opening") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.opening); 
            } else if (gameType === "name") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.names_game); 
            } else if (gameType === "eye") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.eye_game); 
            } else if (gameType === "pixel") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.pixel_game); 
            } else {
                game = await Game.aggregate([{ $sample: { size: 1 } }]);
            }

        } else if (mode === 1) {

            if (gameType === "image") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.image_game_medium); 
            } else if (gameType === "silueta") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.silueta_game_medium); 
            } else if (gameType === "opening") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.opening_medium); 
            } else if (gameType === "name") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.names_game); 
            } else if (gameType === "eye") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.eye_game); 
            } else if (gameType === "pixel") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.pixel_game); 
            }

        } else if (mode === 2) {

            if (gameType === "image") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.image_game_hard);
            } else if (gameType === "silueta") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.silueta_game_hard); 
            } else if (gameType === "opening") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.opening_hard); 
            } else if (gameType === "name") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.names_game); 
            } else if (gameType === "eye") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.eye_game); 
            } else if (gameType === "pixel") {
                do {
                    game = await Game.aggregate([{ $sample: { size: 1 } }]);
                } while (game.length === 0 || !game[0]?.pixel_game); 
            }

        }

        return game.length > 0 ? game[0] : null;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

const addNewGamesUser = async (req, res) => {
    const { userId  } = req.body;
    const userGames = await UserGames.findOne({ userid: userId });
    if (userGames) {
        res.status(200).json({ message: "UserGames already exists" });
    }

    try {
        
        const randomNameGame = await findRandomGame("name", 0);
        const lengthName = randomNameGame.names_game.length;

        const randomImageGame = await findRandomGame("image", 0);
        const lengthImage = randomImageGame.image_game.length;
        const randomImageGameMedium = await findRandomGame("image", 1);
        const lengthImageMedium = randomImageGame.image_game_medium.length;
        const randomImageGameHard = await findRandomGame("image", 2);
        const lengthImageHard = randomImageGame.image_game_hard.length;

        const randomSiluetaGame = await findRandomGame("silueta", 0);
        const lengthSilueta = randomSiluetaGame.silueta_game.length;
        const randomSiluetaGameMedium = await findRandomGame("silueta", 1);
        const lengthSiluetaMedium = randomSiluetaGame.silueta_game_medium.length;
        const randomSiluetaGameHard = await findRandomGame("silueta", 2);
        const lengthSiluetaHard = randomSiluetaGame.silueta_game_hard.length;

        const randomOpeningGame = await findRandomGame("opening", 0);
        const lengthOpening = randomOpeningGame.opening.length;
        const randomOpeningGameMedium = await findRandomGame("opening", 1);
        const lengthOpeningMedium = randomOpeningGame.opening_medium.length;
        const randomOpeningGameHard = await findRandomGame("opening", 2);
        const lengthOpeningHard = randomOpeningGame.opening_hard.length;

        const randomEyeGame = await findRandomGame("eye", 0);
        const lengthEye = randomEyeGame.eye_game.length;

        const randomPixelGame = await findRandomGame("pixel", 0);
        const lengthPixel = randomEyeGame.pixel_game.length;

        const randomIndexOpening = Math.floor(Math.random() * lengthOpening);
        const randomIndexOpeningMedium = Math.floor(Math.random() * lengthOpeningMedium);
        const randomIndexOpeningHard = Math.floor(Math.random() * lengthOpeningHard);

        const randomIndexName = Math.floor(Math.random() * lengthName);
        
        const randomIndexImage = Math.floor(Math.random() * lengthImage);        
        const randomIndexImageMedium = Math.floor(Math.random() * lengthImageMedium);
        const randomIndexImageHard = Math.floor(Math.random() * lengthImageHard);

        const randomIndexSilueta = Math.floor(Math.random() * lengthSilueta);
        const randomIndexSiluetaMedium = Math.floor(Math.random() * lengthSiluetaMedium);
        const randomIndexSiluetaHard = Math.floor(Math.random() * lengthSiluetaHard);

        const randomIndexEye = Math.floor(Math.random() * lengthEye);
        const randomIndexPixel = Math.floor(Math.random() * lengthPixel);

        let newUserGames = new UserGames({
            userid: userId,
            nameid: randomNameGame._id,
            imageid: [randomImageGame._id, randomImageGameMedium._id, randomImageGameHard._id],
            siluetaid: [randomSiluetaGame._id, randomSiluetaGameMedium._id, randomSiluetaGameHard._id],
            openingid: [randomOpeningGame._id, randomOpeningGameMedium._id, randomOpeningGameHard._id],
            eyeid: randomEyeGame._id,
            pixelid: randomPixelGame._id,

            triesname: 0,
            triesimage: [0, 0, 0],
            triessilueta: [0, 0, 0],
            triesopening: [0, 0, 0],
            trieseye: 0,
            triespixel: 0,
            resets: 10,

            finishedImage: [false, false, false],
            finishedName: false,
            finishedSilueta: [false, false, false],
            finishedOpening: [false, false, false],
            finishedEye: false,
            finishedPixel: false,

            statusRewardImage: [0, 0, 0],
            statusRewardSilueta: [0, 0, 0],
            statusRewardName: 0,
            statusRewardOpening: [0, 0, 0],
            statusRewardEye: 0,
            statusRewardPixel: 0,

            imageSelected: [randomIndexImage, randomIndexImageMedium, randomIndexImageHard],
            nameSelected: randomIndexName,
            siluetaSelected: [randomIndexSilueta, randomIndexSiluetaMedium, randomIndexSiluetaHard],
            openingSelected: [randomIndexOpening, randomIndexOpeningMedium, randomIndexOpeningHard],
            eyeSelected: randomIndexEye,
            pixelSelected: randomIndexPixel
        });

        const savedUserGames = await newUserGames.save();
        res.status(201).json(savedUserGames);

    } catch (error) {
        console.error('Error al guardar savedUserGames del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const updateGame = async (req, res) => {
    const { userid, finished, resets, tries, statusReward, game, mode } = req.body;
    try {
        const userGame = await UserGames.findOne({ userid: userid });
        
        if (!userGame) {
            return res.status(404).json({ error: 'UserGame no encontrado' });
        }
        let userQuest = undefined;
        if (userGame) {
            if (game==="image") {
                userGame.finishedImage[mode] = finished;
                userGame.triesimage[mode] = userGame.triesimage[mode] + tries;
                userGame.statusRewardImage[mode] = statusReward;

                if(statusReward === 1) {
                    userQuest = await UserQuests.findOne({ userid: userid });
                    userQuest.statusQuestImage = 1;
                    userQuest.statusQuestAllGames = userQuest.statusQuestAllGames + 1;
                }

            } else if (game==="silueta") {
                userGame.finishedSilueta[mode] = finished;
                userGame.triessilueta[mode] = userGame.triessilueta[mode] + tries;
                userGame.statusRewardSilueta[mode] = statusReward;

                if(statusReward === 1) {
                    userQuest = await UserQuests.findOne({ userid: userid });
                    userQuest.statusQuestSilueta = 1;
                    userQuest.statusQuestAllGames = userQuest.statusQuestAllGames + 1;
                }

            } else if (game==="eye") {
                userGame.finishedEye = finished;
                userGame.trieseye = userGame.trieseye + tries;
                userGame.statusRewardEye = statusReward;

                if(statusReward === 1) {
                    userQuest = await UserQuests.findOne({ userid: userid });
                    userQuest.statusRewardEye = 1;
                    userQuest.statusQuestAllGames = userQuest.statusQuestAllGames + 1;
                }

            } else if (game==="name") {
                userGame.finishedName = finished;
                userGame.triesname = userGame.triesname + tries;
                userGame.statusRewardName = statusReward;
                if(statusReward === 1) {
                    userQuest = await UserQuests.findOne({ userid: userid });
                    userQuest.statusQuestName = 1;
                    userQuest.statusQuestAllGames = userQuest.statusQuestAllGames + 1;
                }
            } else if (game==="opening") {
                userGame.finishedOpening[mode] = finished;
                userGame.triesopening[mode] = userGame.triesopening[mode] + tries;
                userGame.statusRewardOpening[mode] = statusReward;
                if(statusReward === 1) {
                    userQuest = await UserQuests.findOne({ userid: userid });
                    userQuest.statusQuestOpening = 1;
                    userQuest.statusQuestAllGames = userQuest.statusQuestAllGames + 1;
                }
            } else if (game==="pixel") {
                userGame.finishedPixel = finished;
                userGame.triespixel = userGame.triespixel + tries;
                userGame.statusRewardPixel = statusReward;
                if(statusReward === 1) {
                    userQuest = await UserQuests.findOne({ userid: userid });
                    userQuest.statusQuestPixel = 1;
                    userQuest.statusQuestAllGames = userQuest.statusQuestAllGames + 1;
                }
            }

            if(userQuest) {
                await userQuest.save();
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
    const { userid, game, mode } = req.body;
    try {
        const userGame = await UserGames.findOne({ userid: userid });
        
        if (!userGame) {
            return res.status(404).json({ error: 'UserGame no encontrado' });
        }
        if (userGame) {
            if(game==="image") {
                const game = await Game.findOne({ _id: userGame.imageid[mode] });
                let randomIndex;
                if(mode === 0) {
                    randomIndex = Math.floor(Math.random() * (game.image_game.length));
                } else if (mode === 1) {
                    randomIndex = Math.floor(Math.random() * (game.image_game_medium.length));
                } else if (mode === 2) {
                    randomIndex = Math.floor(Math.random() * (game.image_game_hard.length));
                }
                userGame.imageSelected[mode] = randomIndex;
                userGame.triesimage[mode] = 0;
            } else if (game==="silueta") {
                const game = await Game.findOne({ _id: userGame.siluetaid[mode] });
                let randomIndex;
                if(mode === 0) {
                    randomIndex = Math.floor(Math.random() * (game.silueta_game.length));
                } else if (mode === 1) {
                    randomIndex = Math.floor(Math.random() * (game.silueta_game_medium.length));
                } else if (mode === 2) {
                    randomIndex = Math.floor(Math.random() * (game.silueta_game_hard.length));
                }
                userGame.siluetaSelected[mode] = randomIndex;
                userGame.triessilueta[mode] = 0;
            } else if (game==="name") {
                const game = await Game.findOne({ _id: userGame.nameid });
                const randomIndex = Math.floor(Math.random() * (game.names_game.length));
                userGame.nameSelected = randomIndex;
                userGame.triesname = 0;
            } else if (game==="opening") {
                const game = await Game.findOne({ _id: userGame.openingid[mode] });
                let randomIndex;
                if(mode === 0) {
                    randomIndex = Math.floor(Math.random() * (game.opening.length));
                } else if (mode === 1) {
                    randomIndex = Math.floor(Math.random() * (game.opening_medium.length));
                } else if (mode === 2) {
                    randomIndex = Math.floor(Math.random() * (game.opening_hard.length));
                }
                userGame.openingSelected[mode] = randomIndex;
                userGame.triesopening[mode] = 0;
            } else if (game==="eye") {
                const game = await Game.findOne({ _id: userGame.eyeid });
                const randomIndex = Math.floor(Math.random() * (game.eye_game.length));
                userGame.eyeSelected = randomIndex;
                userGame.trieseye = 0;
            } else if (game==="pixel") {
                const game = await Game.findOne({ _id: userGame.pixelid });
                const randomIndex = Math.floor(Math.random() * (game.pixel_game.length));
                userGame.pixelSelected = randomIndex;
                userGame.triespixel = 0;
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
    const { userid, gachas, status, game, mode } = req.body;
    try {
        const userGame = await UserGames.findOne({ userid: userid });
        const userGacha = await Gachas.findOne({ userid: userid });

        if (!userGame || !userGacha) {
            return res.status(404).json({ error: 'UserGame no encontrado o gacha' });
        }

        if (userGame && userGacha) {
            if (game==="image") {
                userGame.statusRewardImage[mode] = status;
            } else if (game==="silueta") {
                userGame.statusRewardSilueta[mode] = status;
            } else if (game==="name") {
                userGame.statusRewardName = status;
            } else if (game==="opening") {
                userGame.statusRewardOpening[mode] = status;
            } else if (game==="eye") {
                userGame.statusRewardEye = status;
            } else if (game==="pixel") {
                userGame.statusRewardPixel = status;
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
        await UserQuests.updateMany({}, { $set: { statusQuestImage: 0 } });
        await UserQuests.updateMany({}, { $set: { statusQuestName: 0 } });
        await UserQuests.updateMany({}, { $set: { statusQuestSilueta: 0 } });
        await UserQuests.updateMany({}, { $set: { statusQuestOpening: 0 } });
        await UserQuests.updateMany({}, { $set: { statusQuestPixel: 0 } });
        await UserQuests.updateMany({}, { $set: { statusQuestAllGames: 0 } });

        res.status(200).json("Reset");
    } catch (err) {
        console.error('Error deleting documents:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const resetGame = async (req, res) => {
    const { userid, game, mode } = req.body;
    try {
        const userGame = await UserGames.findOne({ userid: userid });
        let randomGame = await findRandomGame(game, mode);
        let differentAnime = false;

        while(differentAnime === false) {
            if (game === "image") {
                if(randomGame._id.toString() === userGame.imageid[mode].toString()) {
                    randomGame = await findRandomGame("image", mode);
                } else {
                    differentAnime = true;
                }
            } else if (game==="silueta") {
                if(randomGame._id.toString() === userGame.siluetaid[mode].toString()) {
                    randomGame = await findRandomGame("silueta", mode);
                } else {
                    differentAnime = true;
                }
            } else if (game==="name") {
                if(randomGame._id.toString() === userGame.nameid.toString()) {
                    randomGame = await findRandomGame("name", mode);
                } else {
                    differentAnime = true;
                }
            } else if (game==="opening") {
                if(randomGame._id.toString() === userGame.openingid[mode].toString()) {
                    randomGame = await findRandomGame("opening", mode);
                } else {
                    differentAnime = true;
                }
            } else if (game==="eye") {
                if(randomGame._id.toString() === userGame.eyeid.toString()) {
                    randomGame = await findRandomGame("eye", mode);
                } else {
                    differentAnime = true;
                }
            } else if (game==="pixel") {
                if(randomGame._id.toString() === userGame.pixelid.toString()) {
                    randomGame = await findRandomGame("pixel", mode);
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
                userGame.imageid[mode] = randomGame._id;
            } else if (game === "silueta") {
                userGame.siluetaid[mode] = randomGame._id;
            } else if (game === "name") {
                userGame.nameid = randomGame._id;
                userGame.triesname = userGame.triesname - userGame.triesname;
            } else if (game === "opening") {
                userGame.openingid[mode] = randomGame._id;
            } else if (game === "eye") {
                userGame.eyeid = randomGame._id;
            } else if (game === "pixel") {
                userGame.pixelid = randomGame._id;
            }

            if(userGame.resets>0) {
                userGame.resets = userGame.resets - 1;
            }

            await userGame.save();
            res.status(200).json(userGame);
        }

    } catch (error) {
        console.error('Error al recuperar el userGame:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { findById, findGameImageById, addNewGamesUser, updateGame, updateClaimReward, resetGame, updateSelected, resetDailyGames, findCharactersNames };
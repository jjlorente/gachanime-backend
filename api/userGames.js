const UserGamesController = require ('../controllers/userGames');
const express = require('express');
const router = express.Router();

router.get("/findById", UserGamesController.findById);
router.get("/findCharacters", UserGamesController.findCharactersNames);
router.get("/findGameImageById", UserGamesController.findGameImageById);
router.post("/create", UserGamesController.addNewGamesUser);
router.put("/update", UserGamesController.updateGame);
router.put("/updateReward", UserGamesController.updateClaimReward);
router.put("/resetGame", UserGamesController.resetGame);
router.put("/updateSelected", UserGamesController.updateSelected);
router.delete("/deleteAll", UserGamesController.resetDailyGames);

module.exports = router;
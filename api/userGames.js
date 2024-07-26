const UserGamesController = require ('../controllers/userGames');
const express = require('express');

const router = express.Router();

router.get("/findById", UserGamesController.findById);
router.get("/findGameImageById", UserGamesController.findGameImageById);
router.post("/create", UserGamesController.addNewGamesUser);
router.put("/update", UserGamesController.updateImageGame);
router.put("/updateReward", UserGamesController.updateClaimImageReward);
router.put("/resetGame", UserGamesController.resetGame);
router.put("/updateImageSelected", UserGamesController.updateImageSelected);

module.exports = router;
const UserGamesController = require ('../controllers/userGames');
const express = require('express');

const router = express.Router();

router.get("/findById", UserGamesController.findById);
router.get("/findGameImageById", UserGamesController.findGameImageById);
router.post("/create", UserGamesController.addNewGamesUser);

module.exports = router;
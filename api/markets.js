const MarketController = require ('../controllers/market')
const express = require('express');

const router = express.Router();

router.post("/addCard", MarketController.addCard);

module.exports = router;
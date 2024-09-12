const MarketController = require ('../controllers/market')
const express = require('express');

const router = express.Router();

router.post("/addCard", MarketController.addCard);
router.post("/buyCard", MarketController.buyCard);
router.post("/cancelCard", MarketController.cancelCard);
router.get("/getDataMarket", MarketController.getDataMarket);

module.exports = router;
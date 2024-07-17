const CardController = require ('../controllers/cards')
const express = require('express');

const router = express.Router();

router.get("/findAll", CardController.findAllCards);
router.post("/findCardSummoned", CardController.findCardSummoned);

module.exports = router;
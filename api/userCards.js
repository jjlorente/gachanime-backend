const UserCardsController = require ('../controllers/userCards');
const express = require('express');

const router = express.Router();

router.get("/findById", UserCardsController.findById);
router.get("/calculatePower", UserCardsController.calculateTotalPower);
router.post("/create", UserCardsController.addUserCard);

module.exports = router;
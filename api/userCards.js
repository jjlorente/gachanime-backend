const UserCardsController = require ('../controllers/userCards');
const express = require('express');

const router = express.Router();

router.get("/findById", UserCardsController.findById);

module.exports = router;
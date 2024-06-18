const GachaController = require ('../controllers/gachas')
const express = require('express');

const router = express.Router();

router.post("/create", GachaController.addGacha);
router.get("/findById", GachaController.findById);

module.exports = router;
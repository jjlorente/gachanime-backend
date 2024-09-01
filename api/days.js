const DayController = require ('../controllers/days')
const express = require('express');

const router = express.Router();

router.get("/findById", DayController.findById);
router.post("/create", DayController.create);
router.put("/update", DayController.update);

module.exports = router;
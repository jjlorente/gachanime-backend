const DayController = require ('../controllers/days')
const express = require('express');

const router = express.Router();

router.post("/findById", DayController.findById);
router.post("/create", DayController.create);
router.put("/update", DayController.update);
router.put("/updateWeek", DayController.updateWeek);
router.get("/getWeek", DayController.getWeek);

module.exports = router;
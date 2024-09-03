const SurveyController = require ('../controllers/surveys');
const express = require('express');
const router = express.Router();

router.get("/find", SurveyController.find);
router.put("/update", SurveyController.addVote);

module.exports = router;
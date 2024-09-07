const SurveyController = require ('../controllers/surveys');
const express = require('express');
const router = express.Router();

router.get("/find", SurveyController.find);
router.put("/update", SurveyController.addVote);
router.put("/finished", SurveyController.finishedPoll);

module.exports = router;
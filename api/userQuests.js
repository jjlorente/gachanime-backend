const UserQuestsController = require ('../controllers/userQuests');
const express = require('express');
const router = express.Router();

router.get("/findById", UserQuestsController.findById);
router.post("/create", UserQuestsController.addNewQuestsUser);
router.get("/findQuestsById", UserQuestsController.findAllQuests);
router.put("/updateReward", UserQuestsController.updateClaimReward);
router.post("/updateWeekQuests", UserQuestsController.weekQuests);

module.exports = router;
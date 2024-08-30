const UserQuestsController = require ('../controllers/userQuests');
const express = require('express');
const router = express.Router();

router.get("/findById", UserQuestsController.findById);
router.post("/create", UserQuestsController.addNewQuestsUser);
router.get("/findQuestsById", UserQuestsController.findAllQuests);
router.put("/updateReward", UserQuestsController.updateClaimReward);

module.exports = router;
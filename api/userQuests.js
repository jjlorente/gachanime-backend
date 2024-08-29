const UserQuestsController = require ('../controllers/userQuests');
const express = require('express');
const router = express.Router();

router.get("/findById", UserQuestsController.findById);
router.post("/create", UserQuestsController.addNewQuestsUser);

module.exports = router;
const UserController = require ('../controllers/users');
const express = require('express');

const router = express.Router();

router.get("/", UserController.findAllUsers);
// router.get("/:id", UserController.findById);
// router.put("/:id", UserController.updateUser);
router.post("/find", UserController.findByUsernameAndPassword);

module.exports = router;
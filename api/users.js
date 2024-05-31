const UserController = require ('../controllers/users');
const express = require('express');

const router = express.Router();

router.get("/", UserController.findAllUsers);
// router.get("/:id", UserController.findById);
// router.put("/:id", UserController.updateUser);
// router.post("/add", UserController.addUser);

module.exports = router;
const UserController = require ('../controllers/users');
const express = require('express');

const router = express.Router();

router.get("/", UserController.findAllUsers);
// router.get("/:id", UserController.findById);
// router.put("/:id", UserController.updateUser);
router.get("/findById", UserController.findById);
router.post("/find", UserController.findByUsernameAndPassword);
router.post("/findGoogle", UserController.findByGoogleAccount);
router.post("/create", UserController.addUser);

module.exports = router;
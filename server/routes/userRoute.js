const express = require("express");
const registerController = require("../Controllers/registerController");
const loginController = require("../Controllers/loginController");

const router = express.Router();

router.post('/register',registerController);
router.post('/login',loginController);

module.exports = router;
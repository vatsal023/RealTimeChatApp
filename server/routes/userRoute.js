//userRoute.js
const express = require("express");
const registerController = require("../Controllers/registerController");
const loginController = require("../Controllers/loginController");
const peopleController = require("../Controllers/peopleController");
const verifyEmail = require("../Controllers/emailverificationController");
const { profileController,profileUpdate } = require("../Controllers/profileController");

const router = express.Router();

router.post('/register',registerController);
router.post('/login',loginController);
router.get('/:id/verify/:token',verifyEmail);
router.get('/people',peopleController);
router.get('/profile',profileController);
router.get('/profile/update',profileUpdate);


module.exports = router;
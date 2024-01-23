const express = require('express');
const authRouter = express.Router();
const { signup, signin, getUserInfo } = require('../controllers/authController.js');
const { signUpDataValidate, signinDataValidate, authenticateUser } = require('../middleware/Validate.js');

authRouter.get('/', authenticateUser, getUserInfo);
authRouter.post('/signup', signUpDataValidate , signup);
authRouter.post('/signin', signinDataValidate , signin);

module.exports = authRouter;

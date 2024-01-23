const express = require('express');
const authRouter = express.Router();
const { signup, signin } = require('../controllers/authController.js');
const { signUpDataValidate, signinDataValidate, authenticateUser } = require('../middleware/Validate.js');

authRouter.post('/signup', signUpDataValidate , signup);
authRouter.post('/signin', signinDataValidate , signin);
authRouter.get('/', authenticateUser);

module.exports = authRouter;

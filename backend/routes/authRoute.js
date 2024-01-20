const express = require('express');
const authRouter = express.Router();
const { signup } = require('../controllers/authController.js');
const { signUpDataValidate } = require('../middleware/Validate.js');

authRouter.post('/signup', signUpDataValidate , signup);

module.exports = authRouter;

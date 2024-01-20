const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const signUpDataValidate = (req, res, next) => {
    const { name, username, email, password, bio } = req.body;

    // Checking if all fields are provided
    if (!name || !username || !email || !password || !bio) {
        return res.status(400).json({
            success: false,
            message: "All fields are mandatory",
        })
    }

    // Checking if email is valid
    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: "Please Provide a Valid Email",
        })
    }


    next();
}

const signinDataValidate = (req, res, next) => {
    const { username, password } = req.body;

    // Checking if all fields are provided
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are mandatory",
        })
    }

    next();

}

module.exports = {
    signUpDataValidate,
    signinDataValidate,
}
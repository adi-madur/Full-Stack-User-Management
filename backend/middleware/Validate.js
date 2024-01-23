// Middlewares

const emailValidator = require('email-validator');
const JWT = require('jsonwebtoken');

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

const authenticateUser = (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || null;

    // If Token doesn't exist
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Not Authorized",
        })
    }

    // If token exist
    try {
        const payload = JWT.verify(token, process.env.SECRET);

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Not Authorized",
        })
    }
    // If token exists then next();
    next();


}

module.exports = {
    signUpDataValidate,
    signinDataValidate,
    authenticateUser,
}
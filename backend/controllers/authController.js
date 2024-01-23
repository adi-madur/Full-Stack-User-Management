const userModel = require('../models/userSchema.js');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { name, username, email, password, bio } = req.body;
    try {
        userInfo = userModel(req.body);

        const result = await userInfo.save();

        return res.status(200).json({
            success: true,
            data: result,
        })


    } catch(e) {

        if (e.code === 1000) { //--> 11000 code is a error code for duplicate key. i.e same email / username
            return res.status(400).json({
                success: false,
                message: "Account already exists with this email / username"
            })
        }

        return res.status(400).json({
            success: false,
            message: e.message,
        })

    }

}

const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Finding user in database
        const user = await userModel
        .findOne({username})
        .select('+password') // Also selects password cause defaultly it is `select: false`

        if(!user || await !(bcrypt.compare(password, user.password)) ) { // Compares password (encrypts it first) from body and password from database
            res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        // Now that user has provided correct credentials. We'll generate a token

        const token = user.jwtToken(); // --> User defined Method of Schema
        user.password = undefined;

        // Cookie Object:
        const cookieOption = {
            maxAge: 24*60*60*1000,
            httpOnly: true,
        }

        // Setting Cookies
        res.cookie("token", token, cookieOption);
        res.status(200).json({
            success: true,
            msg: "User Logged in seccessfully",
            data: user,
        })
        
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        })        
    }
}

const getUserInfo = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId);
        return res.status(200).json({
            success: true,
            msg: "User info fetched successfully",
            data: user,
        })

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

module.exports = {
    signup,
    signin,
    getUserInfo
}
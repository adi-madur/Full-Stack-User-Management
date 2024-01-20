const userModel = require('../models/userSchema.js');

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

const singin = async (req, res) => {
    
}

module.exports = {
    signup,
}
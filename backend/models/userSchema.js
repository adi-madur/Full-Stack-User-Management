const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        select:false,
    },
    bio:{
        type: String,
        trim: true,
    }
} , {
    timestamps: true,
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){ //--> If password isn't modified then next()
        return next();
    }

    // If password is modified then encrypt password in 10 rounds/salt
    this.password = await bcrypt.hash(this.password, 10);
    return next();
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
const mongoose = require('mongoose');
const config   = require('config');
const jwt      = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name :{
        type :String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    email :{
        type :String,
        require: true,
        minlength: 5,
        maxlength: 255,
        unique :true
    },
    password :{
        type :String,
        require: true,
        minlength: 3,
        maxlength: 255
    },
    isAdmin :Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id :this._id, isAdmin :this.isAdmin}, config.get("jwtPrivateKey"));
    return token;
} 

const User = mongoose.model('User',userSchema);

module.exports.User = User;
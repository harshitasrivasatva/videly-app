const config   = require('config');
const jwt      = require('jsonwebtoken');
const bcrypt   = require('bcrypt');
const lodash   = require('lodash');
const mongoose = require('mongoose');
const express  = require('express');
const router   = express.Router();
const { User } = require('../model/users');

router.post('/',async (req,res) => {

    const valid = validate(req.body);
    if(!valid) return res.send("Password and Email are required");

    let user = await User.findOne({email :req.body.email});
    if(!user) return res.send("Invalid Password or Email."); 

    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.send("Invalid Password or Email."); 

    // const token = jwt.sign({_id :user._id}, config.get("jwtPrivateKey"));
    const token = user.generateAuthToken();
    res.send(token);
})

function validate(user){
    if(!user.email || !user.password)
      return false;
    return true;   
}

module.exports = router;
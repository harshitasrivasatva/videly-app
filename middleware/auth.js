const config   = require('config');
const jwt      = require('jsonwebtoken');

function auth(req,res,next) {
    
    const token = req.header('auth-header');
    console.log("Token : ",token);
    if(!token) return res.status(401).send("Access denied.No token provided.");

    try{
       const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
       req.user =decoded;
       next();
    } 
    catch(err){
       res.status(400).send("Invalid Token");
    }
}

module.exports =auth;
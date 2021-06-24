const winston = require('winston');

module.exports = function(err,req,res,next){
    // winston.log('Error',err.message);

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.send('Something went wrong.');
}
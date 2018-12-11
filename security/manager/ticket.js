var jwt      = require('jsonwebtoken');
var config   = require('../../config/config.js');

//check if ticket exists
var isExists = function(req){
    if(req.headers.ticket && req.headers.ticket !== undefined){
        return true;
    } return false;
}

//sign ticket
var signTicket = function(data){
   // console.log(config.JWTsecret);
    
    return jwt.sign(data, config.JWTSecret);
}

//return decodedString/false
var verifiyTicket = function(req){
    return jwt.verify(req.headers.ticket, config.JWTSecret);
}

module.exports = {
    isExists: isExists,
    sign: signTicket,
    verifiy: verifiyTicket,
  
}
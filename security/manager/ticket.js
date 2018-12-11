var jwt = require('jsonwebtoken');
var config=require('../../config/config')

var generateToken=function(user){
    console.log("ID=======",user._id);
   
    if(user._id!=null){
       return  jwt.sign({ id: user._id }, config.JWTSecret, {
            expiresIn: 86400 // expires in 24 hours
          });
    }else{
        return false
    } 
}


var verifyToken=function(token){

jwt.verify(token, config.JWTSecret, function(err, decoded) {
    if (err) {
        err = {
          name: 'TokenExpiredError',
          message: 'jwt expired',
          expiredAt: 1408621000
        }
    }else{
        return decoded
    }
  });
}
module.exports={
    generateToken,
    verifyToken
}
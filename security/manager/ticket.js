


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
   
    verifyToken
}
var JWTSecret= "rZnC3mS8D5N1Xh8irVj0pum2Ba3SXjTL";
var port= 3000 ||process.env.PORT
let dbURI="mongodb://localhost:27017/firewall"

module.exports={
    JWTSecret,
    port,
    dbURI

}
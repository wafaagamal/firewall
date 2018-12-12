var sessionManager  = require('./manager/session');
var roleManager     = require('./manager/role');
var ticketManager   = require('./manager/ticket');





module.exports = {
   
  
    for: function(allowedRoles){
        return function(req, res, next){
            if(ticketManager.isExists(req)){
                console.log("TICKET");
               console.log(req)
                var decoded = null;
                try {
                  decoded = ticketManager.verifiy(req);
                }catch(err) {
                
                  console.log("AUTH ERROR", "UNABLE TO DECODE TICKET")
                  console.log("TICKET =>", req.headers.ticket)
                    //token can not be decoded
                  return res.status(401).json()
                }
                
                if(decoded){
                    //very important to attach decoded to req.ticket
                    req.ticket = decoded;
                    //Logger.trace('info', 'security', `decoded ticket: ${JSON.stringify(req.ticket)}`)
                    
                    if(roleManager.isRoleAllowed(req, allowedRoles)){
                       
                        console.log("ALLOWED",allowedRoles);
                        sessionManager.validateURN(req, function(opts){
                            console.log("valid",opts.vaild);
                            
                            if(opts.valid){
                                if(sessionManager.hasVisits(opts.record)){
                                    next();
                                } else {
                                    //reached maximum use
                                    console.log("AUTH ERROR", "REACHED MAXIMUM USAGE")
                                    return res.status(401).json()}
                            } else {
                                console.log("AUTH ERROR", "INVALID SESSION")
                                //invalid ticket session 
                                return res.status(401).json()}
                        });
                    } else {
                        console.log("AUTH ERROR", "INVALID ROLE")
                        //invalid R
                        return res.status(401).json()}
                } else {
                    console.log("AUTH ERROR", "DECODE PROBLEM")
                    //can not decode 
                    return res.status(401).json()} 
            } else {
                console.log("AUTH ERROR", "TOKEN NOT FOUND")
                //token no found
                return res.status(401).json()}
        }
    }
}


var Session=require('../../models/session');
var timeFactory=require('../../module/time-factory');
var Role=require('../../static_arch/roles');
var generateSessionData=function(role){
    return {
        iat: timeFactory.to('second',new Date()),
        exp: timeFactory.to('second',timeFactory.cal('add', Role.getRole(role).ticketValidationInDays, 'day', new Date())),
        maxLogins: Role.getRole(role).maxLogins
    }

}
module.exports={
    login:function(user,callback){
        Session.findOne({user:user._id}).exec(function(err,session){
            if(err){
                console.log(err);
            }
            else{
                if(!session){
                    session=new Session();
                    session.createSessionFor(user);
                }
                var data=session.newLogin(generateSessionData(session.role));
                session.save();
                callback(data);
            }

        })
    },
    validateURN:function(req,callback){
        Session.findOne({user:req.ticket.data._id}).exec(function(err,result){
            if(result){
                if(result.usage.blocked&& record.usage.nextAt > new Date().toISOString()){
                    return callback({err:"not valid session",valid:false,record:result})
                }
                
                var session=result.getLogin(req.ticket.session.urn);
    
                if(session){
                
                    if(session.exp>timeFactory.to('second',new Date())){
                        return callback({err:"",valid:true,record:result});

                    }
                    else{
                        return callback({err:"Time limit",valid:false,record:result})
                    }
                }
                else{
                    return callback({err:"urn not exist",valid:false,record:result})
                }
            }
            else{
                return callback({err:"no session found",valid:false,record:result})
            }

        });

    },hasVisits:function(record){
        if (timeFactory.difIn('hours', record.usage.span, new Date().toISOString()) > 1){
            
            record.resetUsage();
            record.recordUsage();
            record.save();
            return true;

        } else {
            //exceeded limit rate per hour
          
           
            if(record.usage.total >= Role.getRole(record.role).maxTicketUsagePerHour){
                record.blockUsage(generateBlockDetails());
                record.save();
                return false;
            } else {
                
            //record another visit
                record.recordUsage();
                record.save();
                return true;
            }
        }
    },

}

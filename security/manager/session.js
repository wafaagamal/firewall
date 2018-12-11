var Config      = require('../../config/config');
var Session     = require('../../models/session.js');
var timeFactory = require('../../module/time-factory.js');
var Roles       = require('../../static_arch/roles');


//timeFactory.cal('add', opts.ticketValidationInDays, 'day', new Date()),
//timeFactory.cal('add', config.overRequestBanDurationInHours, 'hours', new Date());\
function generateLoginDetails(role){
    return {
            exp: timeFactory.to('seconds', timeFactory.cal('add', Roles.getEnvFor(role).ticketValidationInDays, 'day', new Date())),
            iat: timeFactory.to('seconds', new Date()),
            maxLogins: Roles.getEnvFor(role).maxLogins
        };
}
//generated next release time
function generateBlockDetails(){
    return {
        nextAt: timeFactory.cal('add', Config.banDurationInHours, 'day', new Date())
    }
}

//check if login expired
function isLoginExpired(s){
    // return false;
    var now = timeFactory.to('seconds', new Date());
    return (s.exp < now)? true:false;
}

module.exports = {

    //accepts user id and pass newly created session to the callback
    login: function(user, cb){
        var newLogin;
        Session.findOne({user: user._id}).exec(function(err, record){
            if(!record){
                record = new Session();
                record.createFor(user);
            }
            newLogin = record.newLogin(generateLoginDetails(record.role));
            record.save(function(err, record){
                cb(newLogin);
            });
            
        })
    },

    //works on the level of validation
    validateURN: function(req, cb){
        Session.findOne({user: req.ticket.data._id}).exec(function(err, record){
            if(record){

                //user session usage is not blocked
                if(record.usage.blocked && record.usage.nextAt > new Date().toISOString()){
                    return cb({error:"user is blocked for session abuse and not ready for next usage", valid:false, record:record});
                }

                //session number exists
                var currentSession = record.getLogin(req.ticket.urn);
                if(!currentSession) return cb({error:"login session number not found", valid:false, record:record}); 

                //session date is not expired
                if(isLoginExpired(currentSession)) return cb({error: "login session expired", valid:false, record:record});

                return cb({error: null, valid: true, record:record})
                
            } else {
                return cb({error: "session record not found", valid: false, record:record});
            }
            
        });
    },
    //works on the level of usage and triggers the block
    //returns true false;
    hasVisits: function(record){
        //not with in an hour - so everything resets
        if (timeFactory.difIn('hours', record.usage.span, new Date().toISOString()) > 1){
            
            record.resetUsage();
            record.recordUsage();
            record.save();
            return true;

        } else {
            //exceeded limit rate per hour
            Logger.trace('highlight', 'is out of the span', `total visits ${record.usage.total}`);
            if(record.usage.total >= Roles.getEnvFor(record.role).maxTicketUsagePerHour){
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
            
    }


}

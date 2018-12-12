var User=require('./../models/user')
let uCheck=require('ucheck')
var Validation   = require('../static_arch/validation');
var token=require('../security/manager/ticket')
var Roles=require('../static_arch/roles')
var sessionManger=require('../security/manager/session')
module.exports={
   Login:function(){
       return function(req,res){
           

        var x = [{
            param: 'fullname',
            label: 'Fullname',
            required: true,
            type: 'string',
            regex: Validation.regex.fullname
        },{
            param: 'password',
            label: 'Password',
            required: true,
            type: 'string',
            length: { min: Validation.length.password.min , max: Validation.length.password.max},
            regex: Validation.regex.password
    }]

    let ucheck = new uCheck.validate(req).scenario(x);

        if(ucheck.hasErrors()) {
            return res.status(400).json({error: ucheck.getErrors()});
        }else {
            console.log("Inside Login =======================");
            
            User.findOne({fullname:req.body.fullname}).exec(function(err,user){
                if(err){return res.status(400).send('error')}
                else{
                  if(user){  
                      //if exist check for password
                      if(user.isValidPass(req.body.password)){
                    
                           user.password=undefined;
                           //start new seesion when login
                           sessionManger.login(user,function(session){
                                //console.log("SESSION",session);
                                var ticket=token.sign({data:{_id:user._id,role:user.role},session}); 
                                return res.status(200).json({user,"ticket":ticket})
                            })
                          
                      
                      }else{
                          return res.status(400).send('invalid password')
                      }

                  }else{                      
                      return res.status(404).send('not found')
                  }

                }
            })
        }
   

      }   
    
    },
      AddNewAdmin: function(){
        return function(req,res){

            var x = [{
                param: 'fullname',
                label: 'Fullname',
                required: true,
                type: 'string',
                regex: Validation.regex.fullname
            },{
                param: 'password',
                label: 'Password',
                required: true,
                type: 'string',
                length: { min: Validation.length.password.min , max: Validation.length.password.max},
                regex: Validation.regex.password
        }]
    
        let ucheck = new uCheck.validate(req).scenario(x);
        if(ucheck.hasErrors()) {
            return res.status(400).json({error: ucheck.getErrors()});
        }else{
            console.log("Inside add new admin =======================");
            
                 User.findOne({fullname:req.body.fullname}).exec(function(err,user){
                     if(err){console.log("ERROR");
                     }else{
                         if(!user){  
                             console.log("ID+++++++++++++++++",req.ticket.id);
                             
                            user.createNewAdmin(req.body,req.ticket.id)
                            user.save()
                            user.password=undefined;
                           return res.status(200).json({user})    
                        }
                        else{
                            return res.status(400).json('Already exists')
                        }
                           
                     }
                 })
           
        }
    }
  },
  newStackHolder: function(){
        return function(req,res){

            var x = [{
                param: 'fullname',
                label: 'Fullname',
                required: true,
                type: 'string',
                regex: Validation.regex.fullname
            },{
                param: 'password',
                label: 'Password',
                required: true,
                type: 'string',
                length: { min: Validation.length.password.min , max: Validation.length.password.max},
                regex: Validation.regex.password
        }]

        let ucheck = new uCheck.validate(req).scenario(x);
        if(ucheck.hasErrors()) {
            return res.status(400).json({error: ucheck.getErrors()});
        }else{
            console.log("Inside add new stackholder =======================");
            
                User.findOne({fullname:req.body.fullname}).exec(function(err,user){
                    if(err){console.log("ERROR");
                    }else{
                        if(!user){  
                            user.createNewstackholder(req.body,req.ticket.id)
                            user.save()
                            user.password=undefined;
                        return res.status(200).json({user})    
                        }
                        else{
                            return res.status(400).json('Already exists')
                        }
                        
                    }
                })
        
        }
    }
  },
  resetPassword: function(){
        return function(req,res){
  
          var x = [{
                
                  param: 'password',
                  label: 'Password',
                  required: true,
                  type: 'string',
                  length: { min: Validation.length.password.min , max: Validation.length.password.max},
                  regex: Validation.regex.password
          }]
  
          let ucheck = new uCheck.validate(req).scenario(x);
                  if(ucheck.hasErrors()) {
                      return res.status(400).json({error: ucheck.getErrors()});
                  }else{
                      console.log("reset password =======================");
                      User.findOne({_id:req.ticket.data._id}).exec(function(err,user){
                          if(user){
                              
                             User.update({_id:req.ticket.data._id},{password:user.generateHash(req.body.password)}).exec(function(err,res){
   
                                return res.status(200).json("successfully reseted");
  
                             })
                          
                          }
                          else{
                              return res.status(404).json("user not found");
                          }
                      })
              
  
              }
          }
  }
}

var User=require('./../models/user')
let uCheck=require('ucheck')
var Validation   = require('../static_arch/validation');
var token=require('../security/manager/ticket')
var Roles=require('../static_arch/roles')
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
            
            User.findOne({fullname:req.body.fullname}).exec(function(err,result){
                if(err){return res.status(400).send('error')}
                else{
                  if(result){
                      
                      if(result.isValidPass(req.body.password)){
                           
                          // console.log("TOKEN++++++++++++++++", token.generateToken(result));
                           // token.generateToken(result)
                           result.password=undefined;
                           var ticket=token.sign(result); 
                           return res.status(200).json({result,"ticket":ticket})
                      
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

          
               console.log("start")
            
                 User.findOne({fullname:req.body.fullname}).exec(function(err,user){
                     if(err){console.log("ERROR");
                     }else{
                         if(!user){
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
//   newStackHolder: function(){
//         return function(req,res){


//             var x = [{
//                 param: 'fullname',
//                 label: 'Fullname',
//                 required: true,
//                 type: 'string',
//                 regex: Validation.regex.fullname
//             },{
//                 param: 'password',
//                 label: 'Password',
//                 required: true,
//                 type: 'string',
//                 length: { min: Validation.length.password.min , max: Validation.length.password.max},
//                 regex: Validation.regex.password
//         }]

//         let ucheck = new uCheck.validate(req).scenario(x);
//         if(ucheck.hasErrors()) {
//             return res.status(400).json({error: ucheck.getErrors()});
//         }else{
//             console.log("Inside add new admin =======================");

//         if(req.headers.ticket!=null){
//             console.log(req.headers.ticket);
//             console.log("start")
//             var decode=token.verifyToken(req.headers.ticket)
//             console.log("DECODE====================",decode);
            
//             if(decode){
//                 console.log("++++++++++++++++++++++++++++++");
                
//                 var user=new User()
//                 User.findById({_id:decode.id}).exec(function(err,result){
//                     if(err){console.log("ERROR");
//                     }else{
//                         if(result.role==Roles.roles.admin.name){
//                             user.createNewstackholder(req.body)
//                             user.save() 
//                             user.password=undefined;
//                             var ticket=token.generateToken(user); 
//                             return res.status(200).json({user,"ticket":ticket})
//                             //res.status(200).send("Added Successfully")
//                         }else{
//                             res.status(400).send("invalid role")
//                         }
//                     }
//                 })
//             }else{
//                 res.status(400).send("Invalid ticket")
//             }
//         }else{
//             res.status(400).send("missing ticket")
//              }
//         }
//     }
//   }

}
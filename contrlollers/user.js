var User=require('./../models/user')
let uCheck=require('ucheck')
var Validation   = require('../static_arch/validation');
var token=require('../security/manager/ticket')

module.exports={
   Login:function(){
       return function(req,res){
           

        var x = [{
            param: 'email',
            label: 'Email',
            required: true,
            type: 'string',
            regex: Validation.regex.email
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
            
            var user=new User()
            User.findOne({email:req.body.email}).exec(function(err,result){
                if(err){return res.status(400).send('error')}
                else{
                  if(result){
                      if(user.isValidPass(req.body.password,result.password)){
                           
                          // console.log("TOKEN++++++++++++++++", token.generateToken(result));
                           // token.generateToken(result)
                           result.password=undefined;
                           var ticket=token.generateToken(result); 
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
    
    }

}
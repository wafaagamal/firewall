var User=require('//home//brightmoon//git//firewall//models//user.js')
var role=require('//home//brightmoon//git//firewall//static_arch//roles.js')

module.exports=function(){
    console.log("inside first============");
    
  User.findOne({role:role.roles.admin.name}).exec(function(err,result){
    if(err){console.log("ERROR"+err);
    }else{
       
        if(!result){
          if(!process.env.Email &&process.env.Password){
              console.log(("Inside first admin"));
              return false
          }else{
              var user=new User()
              console.log("####################");
              user.createFirstAdmin({
                  email:process.env.Email,
                  password:process.env.Password     
              })
              user.save()
              return true
          }
        }else{
            console.log('Admin initionalized');
            
        }
    }
  })
 }

 
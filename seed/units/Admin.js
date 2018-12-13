var User=require('../../models/user')
var role=require('../../static_arch/roles')

module.exports=function(){
    console.log("inside first============");
    
  User.findOne({role:role.roles.admin.name}).exec(function(err,result){
    if(err){console.log("ERROR"+err);
    }else{
       
        if(!result){
          if(!process.env.Fullname &&process.env.Password){
              console.log(("Inside first admin"));
              return false
          }else{
              var user=new User()
              console.log("####################");
              user.createFirstAdmin({
                  fullname:process.env.Fullname,
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

 
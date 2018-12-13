var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');
var Roles     = require('../static_arch/roles.js');
var config=require('../config/config')


var User=mongoose.Schema({
    fullname             : { type: String, required: true},
    password             : { type: String},
    role                 : { type: String, default: Roles.roles.admin.name},
    updatedAt            : { type: Date, default: Date.now},
	createdAt            : { type: Date, default: Date.now },
    createdBy            : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resetedPass          : { type: Boolean ,default: false }
},{ usePushEach: true })


User.methods.generateHash=function(password){
 return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)
}
User.methods.isValidPass=function(password){
    console.log("PASSHash",this.password);
    console.log("PASS",password);
    if(!this.password) return false;
 return bcrypt.compareSync(password,this.password)
}

User.methods.createNewstackholder=function(obj,id){
    this.fullname=obj.fullname
    this.password=this.generateHash(obj.password)
    this.role=Roles.roles.stackholder.name
    this.createdAt=new Date()
    this.createdBy=id
}
User.methods.createNewAdmin=function(user,id){
   // console.log("inside create");
   
   //  console.log("if",id);
    
   this.fullname=user.fullname
   this.password=this.generateHash(user.password)
   this.role=Roles.roles.admin.name
   this.createdAt=new Date()
   this.createdBy=id
}
User.methods.createFirstAdmin=function(user){
 //  console.log("Create first Admin",user); 
   this.fullname=user.fullname
   this.password=this.generateHash(user.password)
   this.role=Roles.roles.admin.name
   this.createdAt=new Date()
   
  
}
User.pre('save', function(next) {
	this.updatedAt = new Date();
	next();
});

module.exports = mongoose.model('User', User);
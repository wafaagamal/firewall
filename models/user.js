var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');
var Roles     = require('../static_arch/roles.js');
var config=require('../config/config')


var User=mongoose.Schema({
    email                : { type: String, required: true},
    password             : { type: String},
    role                 : { type: String, default: Roles.roles.admin.name},
    updatedAt            : { type: Date, default: Date.now},
	createdAt            : { type: Date, default: Date.now },
    createdBy            : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    
},{ usePushEach: true })


User.methods.generateHash=function(password){
 return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)
}
User.methods.isValidPass=function(password,hash){
    console.log("PASSHash",hash);
    
    if(!hash) return false;
 return bcrypt.compareSync(password,hash)
}

User.methods.createNewstackholder=function(obj){
    this.email=obj.email
    this.password=this.generateHash(obj.password)
    this.role=Roles.roles.stackholder.name
    this.createdAt=new Date()
    this.createdBy=id
}
User.methods.createNewAdmin=function(user){
   
    
   this.email=user.email
   this.password=this.generateHash(user.password)
   this.role=Roles.roles.admin.name
   this.createdAt=new Date()
   this.createdBy=id
}
User.methods.createFirstAdmin=function(user){
   console.log("Create first Admin",user); 
   this.email=user.email
   this.password=this.generateHash(user.password)
   this.role=Roles.roles.admin.name
   this.createdAt=new Date()
   
  
}
User.pre('save', function(next) {
	this.updatedAt = new Date();
	next();
});

module.exports = mongoose.model('User', User);
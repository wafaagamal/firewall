var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');
var Roles     = require('../static_arch/roles.js');
var jwt = require('jsonwebtoken');
var config=require('../config/config')


var User=mongoose.Schema({
    email                : { type: String, required: true},
    password             : { type: String},
    role                 : { type: String, default: Roles.roles.admin.name},
    updatedAt            : { type: Date, default: Date.now},
	createdAt            : { type: Date, default: Date.now },
    createdBy            : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ticket               : { type: String}
},{ usePushEach: true })


User.methods.generateHash=function(password){
 return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)
}
User.methods.isValidPass=function(password){
    if(!this.password) return false;
 return bcrypt.compareSync(password,this.password)
}
User.methods.createNewstackholder=function(obj,id){
    this.email=obj.email
    this.password=this.generateHash(obj.password)
    this.role=Roles.roles.stackholder.name
    this.createdAt=new Date()
    this.ticket= this.generateToken(obj)
    this.createdBy=id
}
User.methods.createNewAdmin=function(user,id){
   this.email=user.email
   this.password=this.generateHash(user.password)
//    this.role=Roles.roles.admin.name
   this.createdAt=new Date()
   this.ticket= this.generateToken(user)
   this.createdBy=id
}
User.methods.generateToken=function(user){
    if(user._id!=null){
        jwt.sign({ id: user._id }, config.JWTSecret, {
            expiresIn: 86400 // expires in 24 hours
          });
    }else{
        return false
    } 
}
User.pre('save', function(next) {
	this.updatedAt = new Date();
	next();
});

module.exports = mongoose.model('User', User);
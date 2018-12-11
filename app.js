var express=require('express')
var config=require('./config/config')
var path = require('path');
var bodyParser= require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.dbURI,{useMongoClient: true});

var app=express()


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./router')(app)

app.listen(config.port,function(){
console.log('Running on port',config.port)
})
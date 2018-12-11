var express        = require('express');
var router         = express.Router();
var security       =require('../../security')
var userCtrl       = require('../../contrlollers/user');
var Roles          = require('../../static_arch/roles.js');

router.route('/login').post(userCtrl.Login())
 router.route('/add/admin').post(security.for(['admin']),userCtrl.AddNewAdmin())
// router.route('/newStackHolder').post(userCtrl.newStackHolder())

module.exports = router;
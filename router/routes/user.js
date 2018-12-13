var express        = require('express');
var router         = express.Router();
var security       =require('../../security')
var userCtrl       = require('../../contrlollers/user');
var Roles          = require('../../static_arch/roles.js');

router.route('/login').post(userCtrl.Login())
router.route('/add/admin').post(security.for(['admin']),userCtrl.AddNewAdmin())
router.route('/add/stackholder').post(security.for(['admin']),userCtrl.newStackHolder())
router.route('/reset/password').post(security.for(['admin','stackholder']),userCtrl.resetPassword())
router.route('/logout').post(security.for(['admin','stackholder']),userCtrl.logOut())

module.exports = router;
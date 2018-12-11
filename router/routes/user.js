var express        = require('express');
var router         = express.Router();
var userCtrl       = require('../../contrlollers/user');
var Roles          = require('../../static_arch/roles.js');

router.route('/login').post(userCtrl.Login())


module.exports = router;
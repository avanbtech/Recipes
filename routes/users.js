var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var authentication = require('./authentication');

/* GET users listing. */
router.get('/login', userController.user_login);

router.get('/sign_up', userController.user_signup);

module.exports = router;

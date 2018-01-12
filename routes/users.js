var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var authentication = require('./authentication');

/* GET users listing. */
router.get('/', userController.user_login);

module.exports = router;

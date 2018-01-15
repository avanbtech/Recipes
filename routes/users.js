var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var authentication = require('./authentication');

/* GET users listing. */
router.get('/login', userController.user_login_get);

router.post('/login', userController.user_login_post, function(req, res, next){
    res.redirect('/');
});

router.get('/sign_up', userController.user_signup_get);

router.post('/sign_up', userController.user_signup_post);

module.exports = router;

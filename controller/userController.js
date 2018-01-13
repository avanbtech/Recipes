var User = require('../models/user');
var Recipe = require('../models/recipe');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.user_login = function(req, res, next){
    res.render('login');
};

exports.user_signup = function(req, res, next){
    res.render('sign-up');
}
var User = require('../models/user');
var Recipe = require('../models/recipe');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Scape and trim input data
var validate = function(req){
    for(var propt in req.body){
        req.filter(propt).escape();
        req.filter(propt).trim();
    }
};

exports.user_login_get = function(req, res, next){
    res.render('login');
};

exports.user_login_post = passport.authenticate('local', {
    successRedirect:'/', failureRedirect: '/users/login',failureFlash: true
});

exports.user_signup_get = function(req, res, next){
    res.render('sign_up');
};

exports.user_signup_post = function(req, res, next){
    validate(req);

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var dateOfBirth = req.body.birthday;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var user_image = '/images/default_image.png'

    // Validation
    req.checkBody('firstName', 'First name is required').notEmpty();
    req.checkBody('lastName', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('birthday', 'Date of birth is required').optional({ checkFalsy: true }).isISO8601();
    req.checkBody('birthday', 'Date of birth is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.render('sign_up',{errors:errors})
    }
    User.getUserByUsername(username, function(err, user){
       if(err)throw err;
       if(user === null){
           var newUser = new User({
               first_name: firstName,
               last_name: lastName,
               username: username,
               email: email,
               password: password,
               date_of_birth: dateOfBirth,
               image: user_image,
           });
           User.createUser(newUser, function(err, user){
               if(err) throw err;
               console.log(user);
           });
           req.flash('success_msg', 'You are registered and can now login');
           res.redirect('/users/login');
       }
       else{
           req.flash('error_msg', 'Your username is already exists');
           res.redirect('/users/sign_up');
       }
    });
};

// Handle get request to get recipe form
exports.user_add_recipe_get = function(req, res, next){
    res.render('add_recipe');
};

// Handle post request to add recipe to database
exports.user_add_recipe_post = function(req, res, next){
    validate(req);

    var title = req.body.title;
    var level = req.body.title;
    var ingredients = req.body.ingredients;
    var preparation = req.body.preparation;
    var cooking_time = req.body.cooking_time;
    var image_path = req.body.title;
    //TODO: start
};

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }
            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                }else{
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});
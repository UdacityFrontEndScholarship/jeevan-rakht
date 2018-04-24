var express = require('express');
var bcrypt = require('bcryptjs');
var validator = require('validator');
var router = express.Router();

var { findByEmail, signupUser } = require('../../controllers/userController');

var passExpression = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';

router.get('/', function(req, res, next) {
    partials = req.app.get('partials');
    res.render('auth/signup', { title: 'Signup' ,partials: partials});
});

router.post('/', function(req, res, next) {
    const email = validator.isEmail(req.body.email);
    const password = validator.matches(req.body.pass1, passExpression);
    console.log(req.body);
    findByEmail(req.body.email, function(err, result) {
        if (!err && !result) {
            if (req.body.fname.length < 3) {
                res.render('auth/signup', { title: 'Signup', alertMessage: 'Valid first name is required.' });
            } else if (req.body.number.length !== 10) {
                res.render('auth/signup', { title: 'Signup', alertMessage: 'Valid mobile number is required.' });
            } else if (!email) {
                res.render('auth/signup', { title: 'Signup', alertMessage: 'Valid email is required.' });
            } else if (!password) {
                res.render('auth/signup', { title: 'Signup', alertMessage: 'At least on capital letter is required in password.' });
            } else if (req.body.pass1 !== req.body.pass2) {
                res.render('auth/signup', { title: 'Signup', alertMessage: 'Both passwords should match.' });
            } else {
                var userObj = {
                    user_name: req.body.fname,
                    email: req.body.email,
                    password: req.body.pass1,
                    type: '1',
                    not_flag: 'N',
                    active_flag: 'N'
                }
                signupUser(userObj, function(err, result) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    req.flash('successMessage', 'User created! You can now login.');
                    res.redirect('/login');
                });
            }
        } else if (result) {
            res.render('auth/signup', { title: 'Signup', alertMessage: 'User already exists.' });
            return;
        }
    });
});
module.exports = router;
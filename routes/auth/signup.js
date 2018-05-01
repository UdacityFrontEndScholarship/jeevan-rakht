var express = require('express');
var bcrypt = require('bcryptjs');
var validator = require('validator');
var router = express.Router();
var keys = require('../../config/keys');
var state = keys.secret;
var { findByEmail, signupUser } = require('../../controllers/userController');

var passExpression = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';

router.get('/', function(req, res, next) {
    req.session.STATE = state;
    res.render('auth/signup', { title: 'Signup' ,STATE: state });
});

router.post('/', function(req, res, next) {
    if (req.body.usertype === 'Individual') {
        var inputValue = {
            indiv: 'true',
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        }
    } else {
        var inputValue = {
            nonIndiv: 'true',
            orgname: req.body.orgname,
            license: req.body.license,
            email: req.body.email,
            stock: req.body.stock
        }
    }
    partials = req.app.get('partials');
    const email = validator.isEmail(req.body.email);
    const password = validator.matches(req.body.pwd, passExpression);
    var count = 0;
    if (req.body.usertype === 'Individual') {
        var userObj = {
            user_type: req.body.usertype,
            email: req.body.email,
            password: req.body.pwd,
            indiv: {
                name: req.body.firstname + ' ' + req.body.lastname
            },
            notification_flag: 'N',
            active_flag: 'N'
        }
        if (req.body.firstname.length < 3) {
            return res.render('auth/signup', { title: 'Signup', alertMessage: 'Valid first name is required.', inputValue: inputValue });
        } else if (req.body.lastname.length < 3) {
            return res.render('auth/signup', { title: 'Signup', alertMessage: 'Valid last name is required.', inputValue: inputValue });
        }
    } else if (req.body.usertype === 'Non-Individual') {
        var userObj = {
            email: req.body.email,
            password: req.body.pwd,
            non_indiv: {
                org_name: req.body.orgname,
                license: req.body.license,
                unit_stock: req.body.stock
            },
            user_type: req.body.usertype,
            notification_flag: 'N',
            active_flag: 'N'
        }
        if (req.body.orgname.length < 3) {
            return res.render('auth/signup', { title: 'Signup', alertMessage: 'Valid organization name is required.', inputValue: inputValue });
        } else if (req.body.license.length < 3) {
            return res.render('auth/signup', { title: 'Signup', alertMessage: 'Valid license is required.', inputValue: inputValue });
        } else if (req.body.stock < 1) {
            return res.render('auth/signup', { title: 'Signup', alertMessage: 'Stock should be 1 or more.', inputValue: inputValue });
        }
    }
    if (!email) {
        return res.render('auth/signup', { title: 'Signup', alertMessage: 'Valid email is required.', inputValue: inputValue });
    } else if (!password) {
        return res.render('auth/signup', { title: 'Signup', alertMessage: 'At least one capital letter is required in password.', inputValue: inputValue });
    } else if (req.body.pwd !== req.body.verify) {
        return res.render('auth/signup', { title: 'Signup', alertMessage: 'Both passwords should match.', inputValue: inputValue });
    } else {
        findByEmail(req.body.email, function(err, emailResult) {
            if (err) {
                return res.status(500).send({ "error": err.message });
            } else if (emailResult) {
                res.render('auth/signup', { title: 'Signup', alertMessage: 'User already exists.', inputValue: inputValue });
                return;
            } else if (!emailResult) {
                signupUser(userObj, function(err, result) {
                    if (err) {
                        console.error(err);
                        return;
                    } else if (result) {
                        req.flash('successMessage', 'User created! You can now login.');
                        res.redirect('/login');
                    }
                });
            }
        });
    }
});
module.exports = router;
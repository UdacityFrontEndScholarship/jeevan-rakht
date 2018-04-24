var express = require('express');
var router = express.Router();

var keys = require('../../config/keys');
var { loginUser, findByEmail } = require('../../controllers/userController');
var state = keys.secret;

router.get('/', function(req, res, next) {
    req.session.STATE = state;
    partials = req.app.get('partials');
    res.render('auth/login', { title: 'Login', STATE: state, partials: partials });
});

router.post('/', function(req, res, next) {
    var userObj = {
        email: req.body.email,
        password: req.body.pwd
    }
    loginUser(userObj, function(err, result) {
        if (err) {
            res.render('auth/login', { title: 'Login', alertMessage: 'Something went wrong on our side.', emailValue: req.body.email });;
        } else if (result === 1) {
            findByEmail(req.body.email, function(err, result) {
                if (err) {
                    console.log(err);
                } else if (result) {
                    var sessionObj = {
                        userId: result.id,
                        login: true
                    }
                    if (result.picture.length >= 1) {
                        req.flash('userPicture', result.picture[0]);
                    }
                    req.flash('login', 'true');
                    req.session.generalUser = sessionObj;
                    if (req.query.next) {
                        var nextUrl = req.query.next;
                        res.redirect(nextUrl);
                    } else {
                        res.redirect('/');
                    }
                }
            });
        } else if (result === 0) {
            res.render('auth/login', { title: 'Login', alertMessage: 'Wrong Password.', emailValue: req.body.email });
        } else if (!result) {
            res.render('auth/login', { title: 'Login', alertMessage: 'User does not exist.', emailValue: req.body.email });
        }
    });
});
module.exports = router;
var express = require('express');
var router = express.Router();

var keys = require('../../config/keys');
var { loginUser, findByEmail } = require('../../controllers/userController');
var state = keys.secret;

router.get('/', function(req, res, next) {
    res.render('auth/login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    var userObj = {
        email: req.body.email,
        password: req.body.pwd
    }
    loginUser(userObj, function(err, result) {
        if (err) {
            res.render('auth/login', { title: 'Login', alertMessage: 'Something went wrong on our side.' });
        } else if (result === 1) {
            findByEmail(req.body.email, function(err, result) {
                if (err) {
                    console.log(err);
                } else if (result) {
                    req.session.user = result.id;
                    res.redirect('/');
                }
            });
        } else if (result === 0) {
            res.render('auth/login', { title: 'Login', alertMessage: 'Wrong Password.' });
        } else if (!result) {
            res.render('auth/login', { title: 'Login', alertMessage: 'User does not exist.' });
        }
    });
});
module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const router = express.Router();

const User = require('../../models/users');

const passExpression = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';

router.get('/', function(req, res, next) {
    res.render('auth/signup', { title: 'Signup' });
});

router.post('/', function(req, res, next) {
    let count = 0;
    const email = validator.isEmail(req.body.email);
    const password = validator.matches(req.body.pass1, passExpression);

    User.findOne({ email: req.body.email }).then((result) => {
        if (result) {
            res.render('auth/signup', { title: 'Signup', alertMessage: 'user already exists' });
        } else {
            if (req.body.fname.length < 3) {
                res.render('auth/signup', { title: 'Signup', alertMessage: 'Valid first name is required.' });
            } else if (req.body.number.length !== 10) {
                res.render('auth/signup', { title: 'Signup', alertMessage: 'Valid mobile number is required.' });
            } else if (!email) {
                res.render('auth/signup', { title: 'Signup', alertMessage: 'Valid email is required.' });
            } else if (!password) {
                res.render('auth/signup', { title: 'Signup', alertMessage: 'At least on capital letter is required.' });
            } else if (req.body.pass1 !== req.body.pass2) {
                res.render('auth/signup', { title: 'Signup', alertMessage: 'Both passwords should match.' });
            } else {
                const salt = bcrypt.genSaltSync(10);
                bcrypt.hash(req.body.pass1, salt, (err, hash) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    const user = new User({
                        fname: req.body.fname,
                        phone: req.body.number,
                        email: req.body.email,
                        password: hash
                    });
                    console.log(user);
                    user.save().then((result) => {
                        console.log(result);
                        res.render('auth/login', { title: 'Login', successMessage: 'Successfully signed up. You can now login.' });
                    }, (err) => {
                        console.error('something went wrong while save user data to database.', err);
                    });
                });
            }
        }
    });
});
module.exports = router;
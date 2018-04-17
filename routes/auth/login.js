const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../../models/users');

router.get('/', function(req, res, next) {
    res.render('auth/login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
    User.findOne({ email: req.body.email }).then((resultDb) => {
        if (resultDb) {
            bcrypt.compare(req.body.pass1, resultDb.password).then((result) => {
                console.log(result);
                if (result) {
                    const payload = {
                        id: resultDb.id,
                        login: 'true'
                    }
                    const token = jwt.sign(payload, process.env.JWT_SECRET);
                    res.cookie('jwt', token);
                    res.redirect('app');
                } else {
                    res.render('auth/login', { title: 'Login', alertMessage: 'Wrong Password' });
                }
            }, (err) => {
                console.error('something went wrong while comparing passwords.');
            });
        } else {
            res.render('auth/login', { title: 'Login', alertMessage: 'Seems like user does not exists.' });
        }
    }, (err) => {
        console.log('something went wrong while searching user from database.');
    });
});
module.exports = router;
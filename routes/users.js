const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/users');

router.post('/signup', (req, res, next) => {
    User.findOne({ email: req.body.email }).then((result) => {
        if (result) {
            return res.status(209).json({
                message: 'signup failed',
                error: 'email exists'
            });
        }
        const salt = bcrypt.genSaltSync(10);
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then((result) => {
                res.status(200).json({
                    message: 'signup successful, user created'
                });
            }, (err) => {
                res.status(500).json({
                    message: 'signup failed',
                    error: err
                });
            });
        });
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email }).then((result) => {
        if (result) {
            bcrypt.compare(req.body.password, result.password).then((check) => {
                if (check) {
                    const payload = {
                        email: req.body.email,
                        _id: result._id
                    }
                    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
                    return res.status(200).json({
                        message: 'auth successful',
                        token: token
                    });
                }
                return res.status(401).json({
                    message: 'auth failed'
                });
            }, (error) => {
                return res.status(500).json({
                    error: error
                });
            });
        } else if (!result) {
            return res.status(500).json({
                message: 'email does not exist'
            });
        }
    }, (error) => {
        return res.status(500).json({
            error: error
        });
    });
});

router.post('/delete', (req, res, next) => {
    User.findOne({ email: req.body.email }).then((result) => {
        if (result) {
            bcrypt.compare(req.body.password, result.password).then((check) => {
                if (check) {
                    User.remove({ email: req.body.email }).then((result) => {
                        return res.status(200).json({
                            message: 'user deleted'
                        });
                    }, (error) => {
                        return res.status(500).json({
                            error: error
                        });
                    });
                } else {
                    res.status(401).json({
                        message: 'auth failed'
                    });
                }
            }, (error) => {
                return res.status(500).json({
                    error: error
                });
            });
        } else {
            res.status(200).json({
                message: 'user does not exist'
            });
        }
    }, (error) => {
        return res.status(500).json({
            error: error
        });
    });
});

module.exports = router;
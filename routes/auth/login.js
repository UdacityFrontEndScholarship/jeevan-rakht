const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const state = keys.secret;

router.get('/', function(req, res, next) {
	req.session.STATE = state;
  	res.render('auth/login', { title: 'Login', STATE: state });
});
router.post('/', function(req, res, next) {
        res.send('This is POST');
    });
module.exports = router;

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('profile/users', { title: 'Profile' });
});

router.put('/', function(req, res, next) {
  res.send('update profile');
});

router.delete('/', function(req, res, next) {
  res.send('delete profile');
});

module.exports = router;

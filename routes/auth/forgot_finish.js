var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('auth/forgot', { title: 'Forgot Password' });
});
router.post('/', function(req, res, next) {
    res.send('This is POST');
    });
module.exports = router;

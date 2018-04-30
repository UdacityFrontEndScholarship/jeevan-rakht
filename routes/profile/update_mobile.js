var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('profile/update_mobile', { title: 'Update Mobile'});
});
router.post('/', function(req, res, next) {
    res.send('This is POST');
    });
module.exports = router;

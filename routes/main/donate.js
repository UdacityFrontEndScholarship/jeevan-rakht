var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('main/donate', { title: 'Donate Blood'});
});
router.post('/', function(req, res, next) {
    res.send('This is POST');
    });
module.exports = router;

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('main/locate', { title: 'Locate Blood'});
});
router.post('/', function(req, res, next) {
    res.send('This is POST');
    });
module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  partials = req.app.get('partials');
  res.render('app', { title: 'JeevanRakht', partials: partials});
});

module.exports = router;

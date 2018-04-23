var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  partials = req.app.get('partials');
  res.render('profile/verifyemail', { title: 'Verify Email', partials: partials});
});
router.post('/', function(req, res, next) {
    res.send('This is POST');
    });
module.exports = router;

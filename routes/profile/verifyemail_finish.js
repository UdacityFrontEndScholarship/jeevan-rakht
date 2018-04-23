var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    partials = req.app.get('partials');
    res.render('profile/verifyemail_finish', { title: 'Email verified', partials: partials});
    });
module.exports = router;

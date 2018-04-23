var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    partials = req.app.get('partials');
    res.render('main/donorlist', { title: 'Donor List', partials: partials});
    });
module.exports = router;

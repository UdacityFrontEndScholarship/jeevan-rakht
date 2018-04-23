var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    partials = req.app.get('partials');
    res.render('main/donor', { title: 'Donor detail', partials: partials});
    });
module.exports = router;

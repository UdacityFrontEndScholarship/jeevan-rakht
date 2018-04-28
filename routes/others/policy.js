var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('others/policy', { title: 'Policy'});
    });
module.exports = router;

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('main/donorlist', { title: 'Donor List'});
    });
module.exports = router;

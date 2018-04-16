var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('User verification pass/fail');
    });
module.exports = router;

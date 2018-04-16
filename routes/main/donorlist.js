var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Get all donor as per search criteria');
    });
module.exports = router;

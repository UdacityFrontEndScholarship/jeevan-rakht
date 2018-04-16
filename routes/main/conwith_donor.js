var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Send notification alert to donor');
    });
module.exports = router;

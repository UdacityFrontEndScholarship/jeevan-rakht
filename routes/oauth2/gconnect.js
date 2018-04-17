var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Google OAuth2 connection Endpoint');
    });
module.exports = router;

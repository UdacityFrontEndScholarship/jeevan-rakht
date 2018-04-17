var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Facebook OAuth2 connection Endpoint');
    });
module.exports = router;

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Jeevanrakht Terms and Policy');
    });
module.exports = router;

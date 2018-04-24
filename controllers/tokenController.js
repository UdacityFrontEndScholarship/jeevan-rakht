var Token = require('../models/token');
var crypto = require('crypto');

var generate_token = function(user, callback) {    
    var seed = crypto.randomBytes(20);
    var authToken = crypto.createHash('sha1').update(seed).digest('hex');    
    // Create a verification token for this user
     var token = new Token({ _userId: user._id, token: authToken });
       // Save the verification token
       token.save(function (err,tokenObj) {
        if (err) { 
            callback(err, undefined); 
        }
        callback(err, tokenObj);
       });
}

var verify_token = function(in_token, callback) {
    Token.findOne({ token: in_token }, function(err, tokenResult) {
        if (err) {
            console.log('something went wrong while finding token in database.', err);
            callback(err, undefined);
            return;
        } else if (tokenResult) {
            console.log('Token found', tokenResult);
            callback(err, tokenResult);
            return;
        }
        console.log('token not found', tokenResult);
        callback(err, tokenResult);
    });
}

module.exports.generate_token = generate_token;
module.exports.verify_token = verify_token;
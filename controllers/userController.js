const UserAcct = require('../models/user');
const bcrypt = require('bcryptjs');

var signupUser = function(usrObj,callback){
    var newUser = new UserAcct({user_name:usrObj.email,email:usrObj.email, password:usrObj.password
        , user_type:usrObj.type,notification_flag:usrObj.not_flag,active_flag:usrObj.active_flag});
    bcrypt.genSalt(11, function(err, salt) {
        if (err) {
            console.log('Some error occured while salting.', err);
            callback(err, undefined);
            return;
        }
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if (err) {
                console.log('Some error occured while hashing the password', err);
                callback(err, undefined);
                return;
            }
            newUser.password = hash;
            newUser.save(function(err,data){
                if (err){
                    console.log('Unable to save user', err);
                    callback(err, undefined);
                    return;
                }
                console.log('Saved from user model', data);
                callback(err, data);
            });
        });
    });
}

var findByEmail = function(email,callback){
    UserAcct.findOne({ email: email }, function(err, emailResult) {
        if (err){
            console.log('Unable to find email', err);
            callback(err, undefined);
            return;
        }        
        console.log('Email found',emailResult); 
        callback(err, emailResult);
      });
}

var deleteUser = function(email,callback){
    UserAcct.remove({ email: email }, function(err, success) {
        if (!err){
            console.log('Email Removed', success);
            callback(err, success);
          }
      });
}

var updateUser = function(){
}

module.exports.signupUser = signupUser;
module.exports.findByEmail = findByEmail;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
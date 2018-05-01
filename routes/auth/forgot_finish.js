var express = require('express');
var validator = require('validator');
var router = express.Router();

var {verify_token} = require('../../controllers/tokenController');
const UserAcct = require('../../models/user');
var { findByEmail, findById, loginUser, updatePassword } = require('../../controllers/userController');
var passExpression = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';

router.get('/', checkToken, function(req, res, next) {  
    // If we found a token, find a matching user
    findById({ _id: req.tokenResult._userId }, function (err, user) {
			if (err) {
				return res.status(500).send({ "error": err.message }); 
			}			        
      if (!user) {
          req.flash('alertMessage', 'We were unable to find a user for this token.');
          res.redirect('/login');				
          return;
        }
        res.render('auth/forgot_finish', 
          { title: 'Reset Password'
          ,alertMessage: 'This reset link is valid for 1 hour only.'
          });
    });
});

router.post('/', checkToken, function(req, res, next) {
  const password = validator.matches(req.body.password, passExpression);
  if(!password) {
    res.render('auth/forgot_finish', {title: 'Reset Password', alertMessage: 'At least on capital letter is required in password.'});
  } else if(req.body.password !== req.body.verify) {
    res.render('auth/forgot_finish', {title: 'Reset Password', alertMessage: 'Both passwords should match.'});
  } else if(req.tokenResult) {
        var id = req.tokenResult._userId;
        findById(id, function(err, result) {
          if(err) {
            console.log('something went wrong on finding user from id.');
          } else if (!result) {
            req.flash('alertMessage', 'User does not exist.');
            res.redirect('/login');
          } else if (result) {
            var userObj = {
              email: result.email,
              password: req.body.password
            }
            loginUser(userObj, function(err, loginResult) {
              if(err) {
                return res.status(500).send({ "error": err.message }); 
              } else if (loginResult === 1) {
                console.log('new password matched previous password.');            
                res.render('auth/forgot_finish', {title: 'Reset Password', alertMessage: 'Your new password should not match old password.'});
              } else if (loginResult === 0) {
                console.log('new password didn\'t match previous password.');
                updatePassword(userObj, function(err, result) {
                  if (err) {
                    return res.status(500).send({ "error": err.message }); 
                  } else if (result) {
                    req.flash('successMessage', 'Password changed successfully.');
                    res.redirect('/login');
                  } else if(!result) {
                    req.flash('alertMessage', 'User does not exist.');
                    res.redirect('/login');
                  }
                });
              } else if (!loginResult) {
                req.flash('alertMessage', 'User does not exist.');
                res.redirect('/login');
              }
            });
          }
        });
      }
});

function checkToken(req, res, next) {
  token = req.query.token;
  if(!token){
    req.flash('alertMessage', 'Make sure you came here by following reset link sent to your email.');
    res.redirect('/login');				
    return;
  }
  verify_token(token,function (err, tokenResult) {
    if (err) {
      return res.status(500).send({ "error": err.message }); 
    }else if(tokenResult) {
      req.tokenResult = tokenResult;
      next();
      return;
    } else if(!tokenResult) {
      req.flash('alertMessage', 'We were unable to find a valid token. Your token may have expired.');
      res.redirect('/login');		
      return;	
    }
  });
  return;
}

module.exports = router;

var express = require('express');
var router = express.Router();
var {verify_token} = require('../../controllers/tokenController');
var {findById, activateUser} = require('../../controllers/userController');

router.get('/', function(req, res, next) {
    token = req.query.token;
    if(!token){
      req.flash('alertMessage', 'Make sure you came here by following reset link sent to your email.');
      res.redirect('/login');				
      return;
    }
    // Verify token
    verify_token(token,function (err, tokenResult) {
      if (err) {
        return res.status(500).send({ "error": err.message }); 
      }			  
      if (!tokenResult) {
        req.flash('alertMessage', 'We were unable to find a valid token. Your token may have expired.');
        res.redirect('/login');		
        return;		
      }
      // If we found a token, find a matching user
      findById( tokenResult._userId , function (err, user) {
              if (err) {
                  return res.status(500).send({ "error": err.message }); 
              }			        
        if (!user) {
            req.flash('alertMessage', 'We were unable to find a user for this token.');
            res.redirect('/login');				
            return;
          }
          activateUser(user , function (err, user) {
            if (err) {
                return res.status(500).send({ "error": err.message }); 
            }			        
            res.render('profile/verifyemail_finish',
            { title: 'Email verified'
            ,partials: partials
            ,alertMessage: 'Your email is verified successfully.'
            });
          });
      });
    });
  })    
module.exports = router;

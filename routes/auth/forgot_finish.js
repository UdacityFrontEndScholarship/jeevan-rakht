var express = require('express');
var router = express.Router();
var {verify_token} = require('../../controllers/tokenController');
const UserAcct = require('../../models/user');

router.get('/', function(req, res, next) {  
  partials = req.app.get('partials');
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
    UserAcct.findOne({ _id: tokenResult._userId }, function (err, user) {
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
          ,partials: partials
          ,alertMessage: 'This reset link is valid for 1 hour only.'
          });
    });
  });
})  

router.post('/', function(req, res, next) {
  res.send('This is POST');
});

module.exports = router;

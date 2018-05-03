var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var {findByEmail} = require('../../controllers/userController');
var {generate_token} = require('../../controllers/tokenController');

router.get('/', function(req, res, next) {
  if(req.user && (req.user.active_flag === 'A')){
    req.flash('alertMessage', 'Email is already verified.');
    res.redirect('/users');		
    return;		  
  }
  res.render('profile/verifyemail', { title: 'Verify Email'});
});

router.post('/', function(req, res, next) {
	// Make sure this account already exist
	var in_email = req.body.email;
	if(!in_email){
		var message = 'Invalid Email.';
		res.render('profile/verifyemail', { title: 'Verify Email', alertMessage: message});
		return;
	}
	findByEmail(req.body.email, function(err, user) {
    // Make sure user already exist
		if (err) {
			return res.status(500).send({ "error": err.message }); 
		}
		if(!user){
			var message = 'The email address you have entered is not registered.';
			res.render('profile/verifyemail', { title: 'Verify Email', alertMessage: message});
			return;			
    }
    console.log("User in Req" ,req.user._id.toString(),user._id.toString());
		if(req.user && (req.user._id.toString() !== user._id.toString())){
			var message = 'The email address you have entered is already registered with other account.';
			res.render('profile/verifyemail', { title: 'Verify Email', alertMessage: message});
			return;			
		}    
		// Create a verification token for this user
		generate_token(user,function(err, token){
			if (err) {
				return res.status(500).send({ "error": err.message }); 
			}			
			// Send the email
			// Using Sendgrid SMTP API transport
			var client = nodemailer.createTransport({
				service: 'SendGrid',
				auth: {
				  user: process.env.SENDGRID_USERNAME,
				  pass: process.env.SENDGRID_PASSWORD
				}
			});
			var mailOptions = { 
				from: 'no-reply@jeevanrakht.in', 
				to: user.email, 
				subject: 'Account Verification Token', 
				text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \n'+req.protocol+':\/\/' + req.headers.host + '\/verify_finish?token=' + token.token + '.\n' 
			};
			client.sendMail(mailOptions, function (err) {
				if (err) { 
					return res.status(500).send({ "error": err.message }); 
				}
				req.flash('successMessage', 'A verification email has been sent to ' + user.email + '.');
				res.redirect('/login');				
			});
		});
	});
	});
module.exports = router;

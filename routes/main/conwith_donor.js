var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', function(req, res, next) {
    var to_email = req.body.email;
    var donor_name = req.body.donor_name;
	if(!to_email || !donor_name){
        req.flash('alertMessage', 'Donor details are required.');
        res.redirect('/locate');
    }
    var user_name = req.user.indiv.name ? req.user.indiv.name : req.user.non_indiv.org_name;
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
        to: to_email, 
        subject: '[URGENT]Blood Donation Request', 
        text : 'Hello '+donor_name+',\n\n'
        + 'We are sending this email as per the request we received on Jeevanrakht.'
        + 'Please contact '+user_name+' on this '+req.user.email+' email for more details.\n\n' 
        + 'Thank you for being part of this noble cause.\n'
    };
    client.sendMail(mailOptions, function (err) {
        if (err) { 
            res.render('main/locate', { title: 'Locate Blood', alertMessage: err.message});
            return;
        }
        var message = 'Hello '+req.user.email+'. An blood donation request email has been sent to the donor '+donor_name+'.';
        req.flash('successMessage', message);
        res.redirect('/locate');
    });
    });
module.exports = router;

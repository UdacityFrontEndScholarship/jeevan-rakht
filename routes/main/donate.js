var express = require('express');
var router = express.Router();
var moment = require('moment');
var { login_required,profile_required } = require('../../utils/authValidator');
var { bookAppointment } = require('../../controllers/userController');
var { donate_validator } = require('../../utils/formValidators');

router.get('/', 
    login_required, 
    profile_required,   
    function(req, res, next) {
      res.render('main/donate', { title: 'Donate Blood'});
  });
router.post('/', 
    login_required,
    profile_required,
    donate_validator,
    function(req, res, next) {
      let userObj = req.body;
      userObj.title = 'Donate Blood';
      userObj.id = req.user._id;
      console.log(userObj);
      bookAppointment(userObj, function(err, result) {
          if (err) {
              userObj.alertMessage = "DB Error:"+err.message;
              res.render('main/donate', userObj);
          } else if (result) {
              req.flash('successMessage', 'Appointment booked successfully.');
              res.redirect('/');
          }
      });
  });
module.exports = router;

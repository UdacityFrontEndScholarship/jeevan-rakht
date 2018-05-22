var express = require('express');
var router = express.Router();
var moment = require('moment');
var { login_required } = require('../../utils/authValidator');
var { profile_validator } = require('../../utils/formValidators');
var { updateUser,deleteUser } = require('../../controllers/userController');

router.get('/', login_required, function(req, res, next) {
    let obj = {};
    obj.title      = 'Profile';
    obj.firstname   = req.user.indiv.first_name;
    obj.lastname    = req.user.indiv.last_name;
    obj.bloodgroup  = req.user.indiv.blood_grp;
    obj.gender      = req.user.indiv.gender;
    obj.age         = req.user.indiv.age;
    obj.height      = req.user.indiv.height;
    obj.weight      = req.user.indiv.weight;
    if(req.user.indiv.last_donation){
        obj.last_donation  = moment(req.user.indiv.last_donation,'MM/DD/YYYY').format('DD/MM/YYYY');
    }
    obj.orgname     = req.user.non_indiv.org_name;
    obj.license     = req.user.non_indiv.license;
    obj.stock       = req.user.non_indiv.unit_stock;
    
    obj.email       = req.user.email;
    obj.mobile      = req.user.mobile;

    obj.address1   = req.user.address.addr_line1;
    obj.address2    = req.user.address.addr_line2;
    obj.city  = req.user.address.city;
    obj.state      = req.user.address.state;
    obj.zip         = req.user.address.pincode;
    res.render('profile/users', obj);
});

router.post('/', 
    login_required,
    profile_validator,
    function(req, res, next) {
        let userObj = req.body;
        userObj.id = req.user._id;          
        userObj.title = 'Profile';        
        if (req.body._method === 'PUT'){
            userObj.usertype = req.user.user_type;
            if(req.user.indiv.appointment){
              userObj.appointment = req.user.indiv.appointment;            
            };
            updateUser(userObj, function(err, result) {
                if (err) {
                    userObj.alertMessage = "DB Error:"+err.message;
                    res.render('profile/users', userObj);
                } else if (result) {
                    req.flash('successMessage', 'Profile updated successfully.');
                    if (req.query.next) {
                        var nextUrl = req.query.next;
                        res.redirect(nextUrl);
                    } else {
                        res.redirect('/users');
                    }                                        
                }
            });
        }else if(req.body._method === 'DELETE'){
            deleteUser(userObj, function(err, result) {
                if (err) {
                    userObj.alertMessage = "DB Error:"+err.message;
                    res.render('profile/users', userObj);
                } else if (result) {
                //Clear user object from session
                    delete req.session.user;
                //Clear session data for OAuth2 User
                    delete req.session.access_token;
                    delete req.session.gplus_id;
                    delete req.session.fb_id;
                    delete req.session.picture;
                    delete req.session.email;
                    delete req.session.username;
                    req.flash('successMessage', 'Profile deleted successfully.');
                    console.log('Delete Account Successfull');
                    res.redirect('/');
                }
            });            
        }
    });

module.exports = router;
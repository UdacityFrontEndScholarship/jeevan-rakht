var express = require('express');
var router = express.Router();
var moment = require('moment');
var { login_required } = require('../../utils/authValidator');
var { profile_validator } = require('../../utils/formValidators');
var { updateUser } = require('../../controllers/userController');

router.get('/', login_required, function(req, res, next) {
    let obj = {};
    obj.title      = 'Profile';
    obj.firstname   = req.user.indiv.last_name;
    obj.lastname    = req.user.indiv.first_name;
    obj.bloodgroup  = req.user.indiv.blood_grp;
    obj.gender      = req.user.indiv.gender;
    obj.age         = req.user.indiv.age;
    obj.height      = req.user.indiv.height;
    obj.weight      = req.user.indiv.weight;
    obj.last_donation  = moment(req.user.indiv.last_donation).format("L");
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
    console.log(moment(obj.last_donation).format("L"));
    res.render('profile/users', obj);
});

router.post('/', 
    login_required,
    profile_validator,
    function(req, res, next) {
        if (req.body._method === 'PUT'){
            let userObj = req.body;
            userObj.id = req.user._id;
            userObj.title = 'Profile';
            console.log(userObj);
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
            res.send('delete profile');
        }
    });

router.delete('/', function(req, res, next) {
    res.send('delete profile');
});

module.exports = router;
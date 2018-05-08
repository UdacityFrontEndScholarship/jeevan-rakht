function profile_validator(req, res, next) {
    // A function decorator to avoid that code repetition
    // fo checking user login status
    var obj = req.body;
    obj.title = 'Profile';    
    if (req.user.user_type ==='Individual'){
        req.checkBody('firstname','firstname must contain minimum 3 chars.').notEmpty().isLength({ min: 3 });
        req.checkBody('lastname','lastname must contain minimum 3 chars.').notEmpty().isLength({ min: 3 });
        req.checkBody('bloodgroup','One or more field is empty.').notEmpty();
        req.checkBody('gender','One or more field is empty.').notEmpty();
        req.checkBody('age','age must be numeric.').notEmpty().isNumeric();
        req.checkBody('height','height must be numeric.').notEmpty().isNumeric();
        req.checkBody('weight','weight must be numeric.').notEmpty().isNumeric();        
        req.checkBody('last_donation','One or more field is empty.').notEmpty();
    }else if(req.user.user_type ==='Non-Individual'){
        req.checkBody('orgname','orgname must contain minimum 3 chars.').notEmpty().isLength({ min: 3 });
        req.checkBody('license','license must contain minimum 3 chars.').notEmpty().isLength({ min: 3 });
        req.checkBody('stock','One or more field is empty.').notEmpty().isNumeric();
    }
    req.checkBody('address1','Address line1 is required and first letter can\'t be special character.').notEmpty().matches(/^[a-zA-Z0-9]/);
    req.checkBody('address2','Address line2 is required and fist letter can\'t be special character.').notEmpty().matches(/^[a-zA-Z0-9]/);
    req.checkBody('city','city must contain only alphabets and spaces.').matches(/^[a-zA-Z]+[a-zA-Z ]+$/);
    req.checkBody('state','state must contain only alphabets and spaces.').matches(/^[a-zA-Z]+[a-zA-Z ]+$/);
    req.checkBody('country','country is required.').notEmpty();
    req.checkBody('zip','zip must be a 6 digit number.').isLength({ min: 6,max: 6 }).isNumeric();
    if(obj.addrtype ==='gps'){
        obj.gps = true;
    }else if(obj.addrtype ==='userinput'){
        obj.manual = true;
    }
    var errors = req.validationErrors();
    if(errors){
        obj.alertMessage = errors[0].msg;
        res.render('profile/users', obj);
    } else {
        next();
    }
}

module.exports.profile_validator = profile_validator;
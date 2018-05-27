function login_required(req, res, next) {
    // A function decorator to avoid that code repetition
    // fo checking user login status
    if (!req.user) {
        var nextUrl = req.originalUrl;
        req.flash('alertMessage', 'You need to login first to access the protected page.')
        res.redirect('/login?next=' + nextUrl);
    } else {
        next();
    }
}

function email_required(req, res, next) {
    // A function decorator to avoid access without verified email
    if (req.user.active_flag !== 'A') {
        req.flash('alertMessage','unauthorized access: Only user with verified email can access this page.')
        res.redirect('/users');
    } else {
        next();
    }
}

function ownership_required(req, res, next) {
    // A function decorator to avoid unauthorized CRUD
}

function profile_required(req, res, next) {
    // A function decorator to check profile completion status
    if (req.user.active_flag !== 'A' || !req.user.address.pincode) {
        // var nextUrl = req.originalUrl;
        req.flash('alertMessage','unauthorized access: Only user with verified email and updated profile can access this page.')
        // res.redirect('/users?next=' + nextUrl);
        res.redirect('/users');
    } else {
        next();
    }    
}

function checkAccessToken() {}

module.exports.login_required = login_required;
module.exports.email_required = email_required;
module.exports.ownership_required = ownership_required;
module.exports.checkAccessToken = checkAccessToken;
module.exports.profile_required = profile_required;
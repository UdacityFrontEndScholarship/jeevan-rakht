function login_required(req, res, next) {
    // A function decorator to avoid that code repetition
    // fo checking user login status
    if (!req.user) {
        //next=req.url and add this next query string in the /login path
        // e.g /login?next=/users
        // and in login post method check the next value if it is there, then redirect to
        // this next URL otherwise redirect to home
        var nextUrl = req.originalUrl;
        res.redirect('/login?next=' + nextUrl);
    } else {
        next();
    }
}

function email_required(req, res, next) {
    // A function decorator to avoid access without verified email
    if (req.user.active_flag !== 'A') {
        // Add next=req.url query string in the /login path
        // e.g /login?next=/users
        // and in login post method check the next value if it is there, then redirect to
        // this next URL otherwise redirect to home
        req.flash('alertMessage','unauthorized access: Only user with verified email can access this page.')
        res.redirect('/users');
    } else {
        req.flash('userPicture', req.user.picture[0]);
        req.flash('login', 'ture');
        next();
        return;
    }
}

function ownership_required(req, res, next) {
    // A function decorator to avoid unauthorized CRUD
}

function checkAccessToken() {}

module.exports.login_required = login_required;
module.exports.email_required = email_required;
module.exports.ownership_required = ownership_required;
module.exports.checkAccessToken = checkAccessToken;
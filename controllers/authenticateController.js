const UserAcct = require('../models/user');

function authenticate(req, res, next) {
    //Oauth
    if (req.session.access_token) {
        if (req.session.picture) {
            req.flash('userPicture', req.session.picture);
        }
        req.flash('login', 'true');
        res.redirect('/');
        return;
    }

    //General
    var sessionObj = req.session.generalUser;
    if (sessionObj) {
        if (sessionObj.login && sessionObj.userId) {
            UserAcct.findById(sessionObj.userId, function(err, result) {
                if (err) {
                    console.log('something went wrong in authenticate controller.');
                    next();
                } else if (result) {
                    if (result.id === sessionObj.userId) {
                        if (result.picture.length >= 1) {
                            req.flash('userPicture', result.picture[0]);
                        }
                        req.flash('login', 'true');
                        res.redirect('/');
                    } else {
                        next();
                    }
                } else if (!result) {
                    next();
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }
}

module.exports.authenticate = authenticate;
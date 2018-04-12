const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');
const Google = require('../models/google');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Google.findById(id).then((user) => {
        done(null, user);
    }, (err) => {
        done(err);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
    console.log('passport callback function fired.');
    Google.findOne({ googleId: profile.id }).then((res) => {
        if (!res) {
            const google = new Google({
                username: profile.displayName,
                googleId: profile.id
            });
            google.save().then((result) => {
                console.log(result);
                done(null, result);
            }, (err) => {
                console.log(err);
            });
        } else if (res) {
            console.log(res);
            done(null, res);
        }
    }, (err) => {
        console.log(err);
    });
}));
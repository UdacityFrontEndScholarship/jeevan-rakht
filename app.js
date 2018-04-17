const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const passport = require('passport');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const mainRouter = require('./routes/main/app');
const locateRouter = require('./routes/main/locate');
const donateRouter = require('./routes/main/donate');
const donorRouter = require('./routes/main/donor');
const donorListRouter = require('./routes/main/donorlist');
const connDonorRouter = require('./routes/main/conwith_donor');

const loginRouter = require('./routes/auth/login');
const signupRouter = require('./routes/auth/signup');
const forgotRouter = require('./routes/auth/forgot');
const forgotFinishRouter = require('./routes/auth/forgot_finish');
const logoutRouter = require('./routes/auth/logout');

const usersRouter = require('./routes/profile/users');
const updateEmailRouter = require('./routes/profile/update_email');
const updateMobileRouter = require('./routes/profile/update_mobile');
const verifyEmailRouter = require('./routes/profile/verifyemail');
const verifyEmailFinishRouter = require('./routes/profile/verifyemail_finish');
const gploginRouter = require('./routes/oauth2/gconnect');
const fbloginRouter = require('./routes/oauth2/fbconnect');

const googleSetup = require('./config/passportSetup');

const mongoose = require('./db/mongoose');

const app = express();
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }))
    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));

// app.use(express.static(path.join(__dirname, 'public')));
app.use(['/app', '/'], mainRouter);

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/forgot', forgotRouter);
app.use('/forgot_finish', forgotFinishRouter);
app.use('/logout', logoutRouter);

app.use('/users', usersRouter);
app.use('/verify', verifyEmailRouter);
app.use('/verify_finish', verifyEmailFinishRouter);
app.use('/update_email', updateEmailRouter);
app.use('/update_mobile', updateMobileRouter);

app.use('/locate', locateRouter);
app.use('/donate', donateRouter);
app.use('/donor', donorRouter);
app.use('/donarlist', donorListRouter);
app.use('/conwith_donor', connDonorRouter);

app.use('/fbconnect', fbloginRouter);
app.use('/auth', gploginRouter);

app.use(express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log("Error on route")
    console.log(err.message);
    console.log(err.status);
    console.log(err.stack);
    // render the error page
    res.status(err.status || 500);
    res.render('404');
});

module.exports = app;
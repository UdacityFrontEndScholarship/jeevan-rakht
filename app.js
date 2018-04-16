var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var mainRouter = require('./routes/main/app');
var locateRouter = require('./routes/main/locate');
var donateRouter = require('./routes/main/donate');
var donorRouter = require('./routes/main/donor');
var donorListRouter = require('./routes/main/donorlist');
var connDonorRouter = require('./routes/main/conwith_donor');

var loginRouter = require('./routes/auth/login');
var signupRouter = require('./routes/auth/signup');
var forgotRouter = require('./routes/auth/forgot');
var forgotFinishRouter = require('./routes/auth/forgot_finish');
var logoutRouter = require('./routes/auth/logout');

var usersRouter = require('./routes/profile/users');
var updateEmailRouter = require('./routes/profile/update_email');
var updateMobileRouter = require('./routes/profile/update_mobile');
var verifyEmailRouter = require('./routes/profile/verifyemail');
var verifyEmailFinishRouter = require('./routes/profile/verifyemail_finish');
var gploginRouter = require('./routes/oauth2/fbconnect');
var fbloginRouter = require('./routes/oauth2/gconnect');


var mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

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
app.use(['/app','/'], mainRouter);

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
app.use('/gconnect', gploginRouter);

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

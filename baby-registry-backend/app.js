require("dotenv").config()

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')
var app = express(); 
const jwt = require('jsonwebtoken');

var usersRouter = require('./routes/UserRouter');

mongoose
.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MONGO DB CONNECTED"))
.catch((e) => console.log(e))


// view engine setup
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/users', usersRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use((req, res, next) => {
  const jwtToken = req.cookies.jwt_cookie;

  if (jwtToken) {
    try {
      const { email, iat } = jwt.verify(jwtToken, process.env.JWT_USER_SECRET_KEY);
      console.log(iat);
      req.email = email;
    } catch (error) {
      console.log('error: ', error);
    }
  }
  next();
})

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")

// routes
var indexRouter = require('./routes/index');


// express 实例化
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
// 1.app level middleware
app.use(logger('dev'));
app.use(cors())
app.use(express.json()); // 处理json格式数据
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 2. router middleware
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // console.log("locals = ",res.locals)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

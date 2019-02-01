var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

//Database connection
// MongoClient.connect('mongodb://127.0.0.1:27017/animals', function (err, db) {
//   if (err) throw err

//   // db.collection('mammals').find().toArray(function (err, result) {
//   //   if (err) throw err

//   //   console.log(result)
//   // })
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/commonnodes/:files', function(req, res){
  res.render('./gen_vis/common',{
    filesLength: req.params.files.split('-').length,
    fileNames:req.params.files.split('-')
})
});
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

console.log('ROutes initialized');

module.exports = app;

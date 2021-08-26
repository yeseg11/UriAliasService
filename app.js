var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
const routes = require('./routes');

//Main Page
// app.use('/', routes.mainPage.mainPage);

// create uri,alias, isConfig service
app.post('/createUris', routes.post.createUris.createUris);
app.post('/createUri', routes.post.createUri.createUri);


// gre2hebDate
app.post('/gre2hebDate', routes.post.gre2hebPost.gre2hebDate);
app.get('/gre2hebDate/:date', routes.get.gre2hebGet.gre2hebDate);

// heb2greDate
app.get('/heb2greDate/:hDate', routes.get.heb2greService.heb2greDate);

// Dictionary
app.post('/addToDictionary', routes.post.dictionaryData.addDataToDic);
app.get('/getAllDictionary', routes.get.getAllDictionary.getAllDictionary);


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

module.exports = app;

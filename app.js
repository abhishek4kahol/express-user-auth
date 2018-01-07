const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const index = require('./routes/index');
const mongoose = require('mongoose');
const session = require('express-session');

//using session for tracking logins
app.use(session({
  secret: 'js is good',
  resave: true,
  saveUninitialized: false
}));

//make user Id available in templates
app.use((req,res,next) => {
  res.locals.currentUser = req.session.userId;
  next();
}); 

//mongodb connection
mongoose.connect("mongodb://localhost:27017/bookworm");
const db = mongoose.connection;
//mongo error
db.on('error', console.error.bind(console, 'connection error'));

//parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('server started on port :: 3000');
})

module.exports = app;

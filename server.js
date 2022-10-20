// Imports


var createError = require('http-errors');
var express = require('express');
var path = require('path');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');




const app = express();
const port = 4010;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(express.static(path.join(__dirname, 'public')));





// Listen on Port 6000
app.listen(port, () => console.info(`App listening on port ${port}`))
// Imports

const createError = require('http-errors');
const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const port = 4010;
const {addAdmin} = require("./controllers/admin/admin.controller");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.post("/addadmin",addAdmin);
app.use('/users', usersRouter);
app.use(express.static(path.join(__dirname, 'public')));

// Listen on Port 4010
app.listen(port, () => console.info(`App listening on port ${port}`))
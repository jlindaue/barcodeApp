var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var cors = require('cors');
const dotenv = require('dotenv').config()

const userRoutes = require('./userHandling/userRouter')
var productsRouter = require('./routes/products');
var groupsRouter = require('./routes/groups');
var categoriesRouter = require('./routes/categories');

var app = express();
const PORT = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(cors({origin: '*'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, './clientBuild')));

app.use(userRoutes)

app.use(productsRouter);
app.use(groupsRouter);
app.use(categoriesRouter);

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

app.listen(PORT, () => {
  console.log(`The API Server is listening on port: ${PORT}`)
})

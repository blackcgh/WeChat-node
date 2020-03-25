// const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser')

const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');

const userRouter = require('./routes/user');
const chatRouter = require('./routes/chat');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cookieParser());

// 静态资源（头像）
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

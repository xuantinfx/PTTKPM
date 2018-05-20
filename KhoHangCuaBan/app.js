var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Router
var indexRouter_nhan = require('./routes/index_nhan');
var indexRouter = require('./routes/index');

var mysql = require('mysql');
var config = require('./config')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Dùng middlewere này để chèn những thứ cần thiết vào req
app.use((req, res, next) => {
  //Chèn connectionDB vào để sử dụng để query DB
  let connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.pass,
    database: config.mysql.database,
    port: config.mysql.port
  });
  req.connectionToDB = connection;

  //fake đã login
  req.loaiNguoiDung = 'QL'//CK: chủ kho, QL: quản lý, NV: Nhân viên kho
  //fake chu kho
  req.maNguoiDung = '0'; //1,2
  //fake mã kho
  req.maKhoHang = '0';
  //fake quan ly
  req.maNhanVien = 'nv-0'; //nv-1
  //fake nhan vien kho
  //req.maNhanVien = 'nv-2' //nv-3, nv-4,nv-5,nv-6,nv-7

  next();
});

app.use('/', indexRouter);
app.use('/', indexRouter_nhan);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
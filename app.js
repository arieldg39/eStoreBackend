var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const myconnection = require('express-myconnection');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();
//cors
var corsOptions = {
  origin: '*', // Permite todas las solicitudes desde cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  optionsSuccessStatus: 200 // Devuelve 200 para todas las solicitudes OPTIONS
};

app.use(cors(corsOptions));
app.options("*",cors()) 

//Configuracion Conexion MySql
const mysql = require('mysql');
app.use(myconnection(mysql, {
  host: 'localhost',
  //host: 'actumrh.com.ar',
  user: 'root',
  //user: 'actumrh',
  password: 'ariel',
  //password: 'actum2023',
  port: 3306,
  database: 'dbcobroexpres',
  connectionLimit : 10
},'single'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/imagenes', express.static("./imagenes")); //arma un routing para que cuando se referencie a  /imagenes en la url muestre la info que se encuentra en la carpeta imagen

app.use('/api', indexRouter);

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

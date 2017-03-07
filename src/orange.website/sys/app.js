var express = require('express'),
    session = require('express-session'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    auth = require('../../orange.middleware/auth'),
    router = require('./router'),
    app = express(),
    sysUserService = require('../../orange.service/sys_user_service');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', auth.permission);
app.use('/', router);

//           
app.use(function(message, req, res, next) {
    if (message) {
        res.send({ error: true, message: message });
        return;
    } else {
        next();
    }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('error/404');
});

// error handler
app.use(function(err, req, res, next) {

    // render the error page
    res.status(err.status || 500);
    res.render('error/500');
});

module.exports = app;
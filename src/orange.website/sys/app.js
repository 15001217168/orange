var express = require('express'),
    flash = require('express-flash'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,

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
app.use(session({ secret: 'orange', resave: false, saveUninitialized: false, }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);
    // render the error page
    res.status(err.status || 500);
    res.render('error/500');
});

passport.serializeUser(function (user, done) {
    var item = {
        id: user.id,
        name: user.name,
    };
    done(null, item);
});
passport.deserializeUser(function (data, done) {
    done(null, data);
});

passport.use('local', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'pwd'
}, function (username, password, done) {
    sysUserService.login(username, password, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: '该用户 ' + name + ' 不存在' });
        }
        return done(null, user);
    });
}));

module.exports = app;
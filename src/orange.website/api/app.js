var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	index = require('./routes/index'),
	users = require('./routes/users'),
	passport = require('passport'),
	OAuthStrategy = require('passport-oauth').OAuthStrategy,
	oauthServer = require('oauth2-server'),
	oauthModel=require('./oauthmodel'),
	router = require('./router'),
	app = express();


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
app.oauth = oauthServer({
	model: oauthModel, // See below for specification 
	grants: ['password'],
	debug: false
});
app.all('/oauth/token', app.oauth.grant());
app.get('/', app.oauth.authorise(), function (req, res) {
	res.send('Secret area');
});

app.use(app.oauth.errorHandler());

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

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
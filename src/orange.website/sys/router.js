var express = require('express'),
	router = express.Router(),
	sysUserService = require('../../orange.service/sys_user_service'),
	passport = require('passport'),
	isAuthenticated = function (req, res, next) {
		if (req.isAuthenticated()) return next();
		res.redirect('/login');
	};
//首页
router.get('/', isAuthenticated, function (req, res, next) {
	res.render('home/index', {
		title: "首页",
		username: "admin"
	});
});
//登录
router.get('/login', function (req, res, next) {
	res.render('login/index');
});
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
}));
router.get('/logout', function (req, res, next) {
	req.logout();
	res.redirect('/');

});

//注册
router.get('/reg', function (req, res, next) {
	res.render('register/index')
});

router.post('/reg', function (req, res, next) {
	var username = req.body.username;
	var pwd = req.body.pwd;
	var verifypwd = req.body.verifypwd;
	console.log(username);
	sysUserService.register(username, pwd, function (err) {
		if (err) {
			next(err);
		}
		res.redirect("/login");
	});
});


//应用
router.get('/app', function (req, res, next) {
	res.render('app/index');
});
module.exports = router;
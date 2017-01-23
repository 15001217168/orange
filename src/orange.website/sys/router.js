var express = require('express'),
	router = express.Router(),
	sysUserService = require('../../orange.service/sys_user_service');
//首页
router.get('/', function(req, res, next) {
	res.render('home/index', {
		title: "首页",
		username: "admin"
	});
});
//登录
router.get('/login', function(req, res, next) {
	res.render('login/index');
});
router.post('/login', function(req, res, next) {
	debugger;
	var username = req.body.username;
	var pwd = req.body.pwd;
	sysUserService.login(username, pwd, function(err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			res.render('error/404', {
				message: '用户不存在'
			});
			return;
		}
		res.redirect("/");
	});
});

//注册
router.get('/reg', function(req, res, next) {
	res.render('register/index')
});

router.post('/reg', function(req, res, next) {
	var username = req.body.username;
	var pwd = req.body.pwd;
	var verifypwd = req.body.verifypwd;
	console.log(username);
	sysUserService.register(username, pwd, function(err) {
		if (err) {
			next(err);
		}
		res.redirect("/login");
	});
});
module.exports = router;
var express = require('express'),
	router = express.Router(),
	config = require('../../config'),
	crypto = require('crypto'),
	sysUserService = require('../../orange.service/sys_user_service'),
	oauthClientService = require('../../orange.service/oauth_client_service');
//首页
router.get('/', function (req, res, next) {
	res.render('home/index', {
		title: "首页",
		username: "admin"
	});
});
//登录
router.get('/login', function (req, res, next) {
	res.render('login/index');
});
router.post('/login', function (req, res, next) {
	var name = req.body.name, pwd = req.body.pwd;
	
	sysUserService.login(name, pwd, function (err, data) {
		if (err) {
			return next(err);
		}
		var account = {
			username: data.username
		};
		var str = JSON.stringify(account),
			cipher = crypto.createCipher("aes192", config.crypto_key);
		var ciphered = cipher.update(str, 'utf8', 'hex');
		ciphered += cipher.final('hex');

		res.cookie("orange_a", ciphered, { maxAge: 60000 });
		res.redirect('/');
	});
});
router.get('/logout', function (req, res, next) {
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
	sysUserService.register(username, pwd, function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/login");
	});
});


//应用
router.get('/app', function (req, res, next) {
	var page_index = req.query.index || 1;
	oauthClientService.getClients(page_index, "", function (err, list, pagination) {
		if (err) {
			return next(err);
		}
		res.render('app/index', { username: req.user.username, title: "应用列表", list: list, pagination: pagination });
	});
});
router.get('/app/form', function (req, res, next) {
	var id = req.query.id || 0,
		title = id == 0 ? "添加应用" : "修改应用";
	oauthClientService.getClientById(id, function (err, data) {
		if (err) {
			return next(err);
		}
		res.render('app/form', { username: req.user.username, title: title, app: data });
	});
});
router.post('/app/save', function (req, res, next) {
	var id = req.body.id || 0,
		name = req.body.name,
		type = req.body.type;
	oauthClientService.saveClient(id, name, type, function (err, data) {
		if (err) {
			return next(err);
		}
		res.redirect('/app');
	});
});

module.exports = router;
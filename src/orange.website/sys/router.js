var express = require('express'),
    router = express.Router(),
    config = require('../../config'),
    crypto = require('crypto'),
    sysUserService = require('../../orange.service/sys_user_service'),
    oauthClientService = require('../../orange.service/oauth_client_service'),
    orangeTypeService = require('../../orange.service/orange_type_service'),
    orangeContentService = require('../../orange.service/orange_content_service');

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
    var name = req.body.name,
        pwd = req.body.pwd;
    sysUserService.login(name, pwd, function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        var account = {
            username: result.data.username
        };
        var str = JSON.stringify(account),
            cipher = crypto.createCipher("aes192", config.crypto_key);
        var ciphered = cipher.update(str, 'utf8', 'hex');
        ciphered += cipher.final('hex');

        res.cookie("orange_a", ciphered, { maxAge: config.cookie_expire, httpOnly: true });
        res.redirect('/');
    });
});
router.get('/logout', function(req, res, next) {
    res.clearCookie("orange_a");
    res.redirect('/');
});
//注册
router.get('/reg', function(req, res, next) {
    res.render('register/index')
});
router.post('/reg', function(req, res, next) {
    var username = req.body.username;
    var pwd = req.body.pwd;
    var verifypwd = req.body.verifypwd;
    sysUserService.register(username, pwd, function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        res.redirect("/login");
    });
});
//应用
router.get('/app', function(req, res, next) {
    var page_index = req.query.index || 1;
    oauthClientService.getClients(page_index, "", function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        res.render('app/index', { username: req.user.username, title: "应用列表", list: result.data, pagination: result.pagination });
    });
});
router.get('/app/form', function(req, res, next) {
    var id = req.query.id || 0,
        title = id == 0 ? "添加应用" : "修改应用";
    oauthClientService.getClientById(id, function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        res.render('app/form', { username: req.user.username, title: title, app: result.data });
    });
});
router.post('/app/save', function(req, res, next) {
    var id = req.body.id || 0,
        name = req.body.name,
        type = req.body.type;
    oauthClientService.saveClient(id, name, type, function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        res.redirect('/app');
    });
});

//用户
router.get('/user', function(req, res, next) {
    var page_index = req.query.index || 1;
    sysUserService.getUsers(page_index, "", function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        res.render('user/index', { username: req.user.username, title: "系统用户列表", list: result.data, pagination: result.pagination });
    });
});
router.get('/user/form', function(req, res, next) {
    var id = req.query.id || 0,
        title = id == 0 ? "添加系统用户" : "修改系统用户";
    sysUserService.getUserById(id, function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        res.render('user/form', { username: req.user.username, title: title, user: result.data });
    });
});
router.post('/user/save', function(req, res, next) {
    var id = req.body.id || 0,
        name = req.body.name,
        pwd = req.body.pwd;
    sysUserService.saveUser(id, name, pwd, function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        res.redirect('/user');
    });
});

//类型
router.get('/type', function(req, res, next) {
    var page_index = req.query.index || 1;
    orangeTypeService.getTypes(page_index, "", function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        res.render('type/index', { username: req.user.username, title: "类型列表", list: result.data, pagination: result.pagination });
    });
});
router.get('/type/form', function(req, res, next) {
    var id = req.query.id || 0,
        title = id == 0 ? "添加类型" : "修改类型";
    orangeTypeService.getTypeById(id, function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        res.render('type/form', { username: req.user.username, title: title, type: result.data });
    });
});
router.post('/type/save', function(req, res, next) {
    var id = req.body.id || 0,
        name = req.body.name;
    orangeTypeService.saveType(id, name, function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        res.redirect('/type');
    });
});

//内容
router.get('/content', function(req, res, next) {
    var page_index = req.query.index || 1;
    orangeContentService.getContents(page_index, "", function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        res.render('content/index', { username: req.user.username, title: "内容列表", list: result.data, pagination: result.pagination });
    });
});
router.get('/content/form', function(req, res, next) {
    var id = req.query.id || 0,
        title = id == 0 ? "添加内容" : "修改内容";
    orangeContentService.getContentById(id, function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        res.render('content/form', { username: req.user.username, title: title, content: result.title });
    });
});
router.post('/content/save', function(req, res, next) {
    var id = req.body.id || 0,
        name = req.body.name;
    orangeContentService.saveContent(id, name, function(result) {
        if (result.error == true) {
            return next(result.message);
        }
        res.redirect('/content');
    });
});

module.exports = router;
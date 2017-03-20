var express = require('express'),
    router = express.Router(),
    config = require('../../config'),
    crypto = require('crypto'),
    multiparty = require('multiparty'),
    fs = require('fs'),
    sysUserService = require('../../orange.service/sys_user_service'),
    oauthClientService = require('../../orange.service/oauth_client_service'),
    orangeTypeService = require('../../orange.service/orange_type_service'),
    orangeContentService = require('../../orange.service/orange_content_service'),
    utils = require('../../orange/utils'),
    crypto = require('crypto'),
    bizResult = require('../../orange/result/result').BizResult;

//页面
router.get('/', function(req, res, next) {
    res.render('index', { user: req.user });
});
router.get('/reg', function(req, res, next) {
    res.render('reg');
});
router.get('/login', function(req, res, next) {
    res.render('login');
});
router.get('/sign_out', function(req, res, next) {
    res.clearCookie("orange_w");
    res.redirect('/');
});

router.get('/writer', function(req, res, next) {
    res.render('writer');
});
router.get('/p', function(req, res, next) {
    res.render('detail', { user: req.user });
});
router.get('/td', function(req, res, next) {
    res.render('list', { user: req.user });
});
router.get('/t', function(req, res, next) {
    res.render('types', { user: req.user });
});

var getToken = function(callback) {
    var appid = global.web_config.app_id,
        app_secret = global.web_config.app_secret,
        noncestr = utils.createUniqueId(16),
        timespan = new Date().getTime();

    var str = appid + timespan + app_secret + noncestr;
    var sha256 = crypto.createHash("sha256");
    sha256.update(str);
    var sign = sha256.digest('hex').toUpperCase();

    utils.httpPost('/api/authorize', {
        appid: appid,
        timespan: timespan,
        noncestr: noncestr,
        sign: sign,
    }, function(res) {
        if (res.error) {
            //请求失败
        } else {
            if (res.data.code == '0000') {
                var access_token = res.data.data.access_token;
                global.web_config.access_token = access_token;
                callback();
            } else {

            }
        }
    });
};
router.post('*', function(req, res, next) {
    if (global.web_config.access_token == '') {
        getToken(function() {
            next();
        });
    } else {
        next();
    }
});
//注册
router.post('/reg', function(req, res, next) {
    utils.httpPost('/api/register', {
        nick_name: req.body.nick_name,
        phone: req.body.phone,
        pwd: req.body.pwd,
        code: req.body.sms_code,
        access_token: global.web_config.access_token
    }, function(result) {
        if (result.error) {
            res.send(bizResult.error(result.message));
            return;
        } else {
            if (result.data.code == '0000') {
                res.send(bizResult.success(result.data.message));
                return;
            } else {
                res.send(bizResult.error(result.data.message));
                return;
            }
        }
    });
});

//发送验证码
router.post('/send_sms', function(req, res, next) {
    utils.httpPost('/api/send_sms_code', {
        phone: req.body.phone,
        access_token: global.web_config.access_token
    }, function(result) {
        if (result.error) {
            res.send(bizResult.error(result.message));
            return;
        } else {
            if (result.data.code == '0000') {
                res.send(bizResult.success(result.data.message));
                return;
            } else {
                res.send(bizResult.error(result.data.message));
                return;
            }
        }
    });
});

//登陆
router.post('/login', function(req, res, next) {
    utils.httpPost('/api/login', {
        phone: req.body.phone,
        pwd: req.body.pwd,
        access_token: global.web_config.access_token
    }, function(result) {
        if (result.error) {
            res.send(bizResult.error(result.message));
            return;
        } else {
            if (result.data.code == '0000') {

                var account = {
                    userid: result.data.data.userid,
                    phone: result.data.data.phone,
                    nick_name: result.data.data.nick_name,
                    avatar: result.data.data.avatar
                };
                var str = JSON.stringify(account),
                    cipher = crypto.createCipher("aes192", global.web_config.aes_key);
                var ciphered = cipher.update(str, 'utf8', 'hex');
                ciphered += cipher.final('hex');

                res.cookie("orange_w", ciphered, { maxAge: config.cookie_expire, httpOnly: true });
                res.send(bizResult.success(result.data.message));
                return;
            } else {
                res.send(bizResult.error(result.data.message));
                return;
            }
        }
    });
});

//保存内容
router.post('/save_content', function(req, res, next) {
    utils.httpPost('/api/save_content', {
        phone: req.body.phone,
        access_token: global.web_config.access_token
    }, function(result) {
        if (result.error) {
            res.send(bizResult.error(result.message));
            return;
        } else {
            if (result.data.code == '0000') {
                res.send(bizResult.success(result.data.message));
                return;
            } else {
                res.send(bizResult.error(result.data.message));
                return;
            }
        }
    });
});

router.post('/editor.md/upload', function(req, res, next) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({ uploadDir: config.upload_path });
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(bizResult.error('上传图片失败！'));
            return;
        } else {
            var file = files["imgUpload"][0];
            var uploadedPath = file.path.replace(config.upload_path, '');
            res.send(bizResult.success('上传图片成功！', { url: config.img_url + '/upload/' + uploadedPath }));
            return;
        }
    });
});

module.exports = router;
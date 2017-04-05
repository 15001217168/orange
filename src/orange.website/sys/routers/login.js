var config = require('../../../config'),
    crypto = require('crypto'),
    bizResultMsg = require('../../../orange/result/result').BizResult,
    sysUserService = require('../../../orange.service/sys_user_service');

module.exports = function(router) {
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
                username: result.data.username,
            };
            var str = JSON.stringify(account),
                cipher = crypto.createCipher("aes192", config.crypto_key);
            var ciphered = cipher.update(str, 'utf8', 'hex');
            ciphered += cipher.final('hex');

            res.cookie("orange_a", ciphered, { maxAge: config.cookie_expire, httpOnly: true });
            res.send(bizResultMsg.success('登录成功'));
            return;
        });
    });
    router.get('/logout', function(req, res, next) {
        res.clearCookie("orange_a");
        res.redirect('/');
    });

};
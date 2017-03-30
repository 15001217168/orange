var bizResult = require('../../../orange/result/result').BizResult,
    utils = require('../../../orange/utils'),
    crypto = require('crypto'),
    config = require('../../../config');

module.exports = function(router) {
    router.get('/login', function(req, res, next) {
        res.render('login');
    });
    router.get('/sign_out', function(req, res, next) {
        res.clearCookie("orange_w");
        res.redirect('/');
    });

    //登陆
    router.post('/login', function(req, res, next) {
        utils.httpPost('/api/login', {
            phone: req.body.phone,
            pwd: req.body.pwd,
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
};
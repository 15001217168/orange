var crypto = require('crypto'),
    oauthClientService = require('../orange.service/oauth_client_service'),
    oauthTokenService = require('../orange.service/oauth_token_service'),
    utils = require('../orange/utils'),
    config = require('../config');


var oauth2 = {
    authorization: function(req, res, next) {
        var access_token = req.body.access_token;
        if (!access_token) {
            res.send({ code: '8888', message: 'access_token不能为空', data: {} });
            return;
        }
        oauthTokenService.getToken(access_token, function(err, doc) {
            if (err) {
                res.send({ code: '9998', message: '验证Token失败', data: {} });
                return;
            }
            if (doc) {
                if (doc.token == access_token) {
                    var now = new Date();
                    var expire = new Date(doc.expire_date);

                    var dif = now.getTime() - expire.getTime();
                    var seconds = Math.round(dif / 1000);

                    if (seconds > config.expire) {
                        res.send({ code: '9997', message: 'Token失效，请重新验证', data: {} });
                        return;
                    } else {
                        next();
                        return;
                    }
                } else {
                    res.send({ code: '9998', message: '验证Token失败', data: {} });
                    return;
                }
            } else {
                res.send({ code: '9998', message: '验证Token失败', data: {} });
                return;
            }
        });
    },
    access_token: function(req, res, next) {
        var appid = req.body.appid,
            timespan = req.body.timespan,
            noncestr = req.body.noncestr,
            sign = req.body.sign;
        if (!appid) {
            res.send({ code: '8888', message: 'appid不能为空', data: {} });
            return;
        }
        if (!timespan) {
            res.send({ code: '8888', message: 'timespan不能为空', data: {} });
            return;
        }
        if (!noncestr) {
            res.send({ code: '8888', message: 'noncestr不能为空', data: {} });
            return;
        }
        if (!sign) {
            res.send({ code: '8888', message: 'sign不能为空', data: {} });
            return;
        }
        oauthClientService.getClientByAppId(appid, function(err, client) {
            if (err) {
                res.send({ code: '9999', message: '验证客户端失败', data: {} });
                return;
            }
            if (client) {
                var str = appid + timespan + client.app_secret + noncestr;
                var sha256 = crypto.createHash("sha256");
                sha256.update(str);
                var mysign = sha256.digest('hex');

                if (mysign == sign) {
                    var access_token = utils.createUniqueId(32);
                    oauthTokenService.addToken(appid, access_token);
                    res.send({ code: '0000', message: '验证客户端成功', data: { access_token: access_token } });
                    return;
                } else {
                    res.send({ code: '9999', message: '签名验证失败', data: {} });
                    return;
                }
            } else {
                res.send({ code: '9999', message: '验证客户端失败', data: {} });
                return;
            }
        });
    },
};
module.exports = oauth2;
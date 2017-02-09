var crypto = require('crypto')
    , oauthClientService = require('../orange.service/oauth_client_service')
    , oauthTokenService = require('../orange.service/oauth_token_service')
    , utils = require('../orange/utils'),
    config = require('../config');


var oauth2 = {
    authorization: function (req, res, next) {
        var appid = req.body.appid;
        var access_token = req.body.access_token;
        if (appid && access_token) {
            oauthTokenService.getToken(appid, function (err, doc) {
                if (err) {
                    res.send({ code: '9999', message: '验证Token失败', data: {} });
                }
                if (doc) {
                    if (doc.token == access_token) {
                        var now = new Date();
                        var expire = new Date(doc.expire_date);

                        var dif = now.getTime() - expire.getTime();
                        var seconds = Math.round(dif / 1000);

                        if (seconds > config.expire) {
                            res.send({ code: '9999', message: '验证Token失效，请重新生成', data: {} });
                        }
                        else {
                            next();
                        }
                    }
                    else {
                        res.send({ code: '9999', message: '验证Token失败', data: {} });
                    }
                } else {
                    res.send({ code: '9999', message: '验证Token失败', data: {} });
                }
            });
        }
        else {
            res.send({ code: '9999', message: '请检查请求参数', data: {} });
        }
    },
    access_token: function (req, res, next) {
        var appid = req.body.appid;
        var timespan = req.body.timespan;
        var noncestr = req.body.noncestr;
        var sign = req.body.sign;

        if (appid) {
            oauthClientService.getClientByAppId(appid, function (err, client) {
                if (err) {
                    res.send({ code: '9999', message: '验证客户端失败', data: {} });
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
                    }
                    else {
                        res.send({ code: '9999', message: '签名验证失败', data: {} });
                    }
                }
                else {
                    res.send({ code: '9999', message: '验证客户端失败', data: {} });
                }
            });
        }
        else {
            res.send({ code: '9999', message: '请检查请求参数', data: {} });
        }
    },
};
module.exports = oauth2;

var crypto = require('crypto'),
    resultMsg = require('../orange/result/result').Result,
    oauthClientService = require('../orange.service/oauth_client_service'),
    oauthTokenService = require('../orange.service/oauth_token_service'),
    utils = require('../orange/utils'),
    config = require('../config');


var oauth2 = {
    authorization: function(req, res, next) {
        var access_token = req.body.access_token;
        if (!access_token) {
            res.send(resultMsg.required('access_token不能为空'));
            return;
        }
        oauthTokenService.getToken(access_token, function(result) {
            if (result.error == true) {
                res.send(resultMsg.fail('9998', '验证Token失败'));
                return;
            } else {
                if (result.data.token == access_token) {
                    var now = new Date();
                    var expire = new Date(result.data.expire_date);

                    var dif = now.getTime() - expire.getTime();
                    var seconds = Math.round(dif / 1000);

                    if (seconds > config.token_expire) {
                        res.send(resultMsg.fail('9997', 'Token失效，请重新验证'));
                        return;
                    } else {
                        res.app_id = result.data.app_id;
                        next();
                        return;
                    }
                } else {
                    res.send(resultMsg.fail('9998', '验证Token失败'));
                    return;
                }
            }
        });
    },
    access_token: function(req, res, next) {
        var appid = req.body.appid,
            timespan = req.body.timespan,
            noncestr = req.body.noncestr,
            sign = req.body.sign;
        if (!appid) {
            res.send(resultMsg.required('appid不能为空'));
            return;
        }
        if (!timespan) {
            res.send(resultMsg.required('timespan不能为空'));
            return;
        }
        if (!noncestr) {
            res.send(resultMsg.required('noncestr不能为空'));
            return;
        }
        if (!sign) {
            res.send(resultMsg.required('sign不能为空'));
            return;
        }
        oauthClientService.getClientByAppId(appid, function(result) {
            if (result.error == true) {
                res.send(resultMsg.fail('验证客户端失败'));
                return;
            } else {
                var str = appid + timespan + result.data.app_secret + noncestr;
                var sha256 = crypto.createHash("sha256");
                sha256.update(str);
                var mysign = sha256.digest('hex').toUpperCase();

                if (mysign == sign) {
                    var access_token = utils.createUniqueId(32);
                    oauthTokenService.addToken(appid, access_token);
                    res.send(resultMsg.success('验证客户端成功', { access_token: access_token }));
                    return;
                } else {
                    res.send(resultMsg.fail('签名验证失败'));
                    return;
                }
            }
        });
    },
};
module.exports = oauth2;
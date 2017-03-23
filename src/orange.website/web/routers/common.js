var bizResult = require('../../../orange/result/result').BizResult,
    utils = require('../../../orange/utils'),
    crypto = require('crypto');

module.exports = function(router) {
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
};
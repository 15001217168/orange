var repository = require('../orange.repository/oauth_repository'),
    bizResultMsg = require('../orange/result/result').BizResult,
    config = require('../config'),
    OauthToken = repository.OauthToken;

exports.getToken = function(token, callback) {
    OauthToken.findOne({
        token: token,
        is_blocked: false,
        is_deleted: false
    }, function(err, doc) {
        if (err) {
            callback(bizResultMsg.error('获取Token失败'));
        } else {
            if (doc) {
                callback(bizResultMsg.success('获取Token成功', doc));
            } else {
                callback(bizResultMsg.error('获取Token失败'));
            }
        }
    });
};
exports.getAppIdByToken = function(token, callback) {
    OauthToken.findOne({
        token: token,
        is_blocked: false,
        is_deleted: false
    }, function(err, doc) {
        if (err) {
            callback(bizResultMsg.error('获取AppId失败', { app_id: "" }));
        }
        if (doc) {
            callback(bizResultMsg.success('获取Token成功', { app_id: doc.app_id }));
        } else {
            callback(bizResultMsg.error('获取AppId失败', { app_id: "" }));
        }
    });
};
exports.addToken = function(appid, token) {
    var now = new Date(),
        expire_date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + config.token_expire, now.getMinutes(), now.getSeconds());
    var item = new OauthToken();
    item.app_id = appid;
    item.token = token;
    item.expire_date = expire_date;
    item.save();
};
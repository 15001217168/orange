var repository = require('../orange.repository/oauth_repository'),
    bizResultMsg = require('../orange/result/result').BizResult,
    OauthToken = repository.OauthToken;

exports.getToken = function(token, callback) {
    OauthToken.findOne({
        token: token,
        is_blocked: false,
        is_deleted: false
    }, function(err, doc) {
        if (err) {
            callback(bizResultMsg.error('获取Token失败'));
        }
        if (doc) {
            callback(bizResultMsg.success('获取Token成功', doc));
        } else {
            callback(bizResultMsg.error('获取Token失败'));
        }
    });
};
exports.addToken = function(appid, token) {
    var item = new OauthToken();
    item.app_id = appid;
    item.token = token;
    item.save();
};
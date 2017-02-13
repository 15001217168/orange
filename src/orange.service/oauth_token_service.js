var repository = require('../orange.repository/oauth_repository');
var OauthToken = repository.OauthToken;

exports.getToken = function (token, callback) {
	OauthToken.findOne({
		token: token,
		is_blocked: false,
		is_deleted: false
	}, function (err, doc) {
		if (err) {
			callback(err, null);
		}
		if (doc) {
			callback(null, doc);
		}
		else {
			callback(new Error('未找到Token'), null);
		}
	});
};
exports.addToken = function (appid, token) {
	var item = new OauthToken();

	item.app_id = appid;
	item.token = token;
	item.save();

};
var repository = require('../orange.repository/oauth_repository');
var OauthToken = repository.OauthToken;

exports.getToken = function(appid, callback) {
	OauthToken.findOne({
		app_id: appid,
		is_blocked: false,
		is_deleted: false
	}, callback);
};
var repository = require('../orange.repository/oauth_repository');
var OauthClient = repository.OauthClient;

exports.getClient = function (appid, callback) {
	OauthClient.findOne({
		app_id: appid,
		is_blocked: false,
		is_deleted: false
	}, callback);
};
exports.getClients = function () {

};
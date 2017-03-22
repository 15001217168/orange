var mongoose = require('./repository').mongoose;
// models
require('../orange.entity/oauth/oauth_client');
require('../orange.entity/oauth/oauth_token');
require('../orange.entity/oauth/oauth_user');


exports.OauthClient = mongoose.model('OauthClient');
exports.OauthToken = mongoose.model('OauthToken');
exports.OauthUser = mongoose.model('OauthUser');
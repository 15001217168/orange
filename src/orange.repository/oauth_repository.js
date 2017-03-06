var mongoose = require('mongoose'),
    config = require('../config');

mongoose.connect(config.db.url, {
    server: {
        poolSize: 20
    }
}, function(err) {
    if (err) {
        console.log('connect to ' + config.db.url + ' error: ' + err.message);
    }
});

// models
require('../orange.entity/oauth/oauth_client');
require('../orange.entity/oauth/oauth_token');
require('../orange.entity/oauth/oauth_user');


exports.OauthClient = mongoose.model('OauthClient');
exports.OauthToken = mongoose.model('OauthToken');
exports.OauthUser = mongoose.model('OauthUser');
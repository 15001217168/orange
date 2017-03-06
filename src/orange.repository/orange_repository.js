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
require('../orange.entity/orange/orange_type');
require('../orange.entity/orange/orange_content');
require('../orange.entity/orange/orange_sms');

exports.OrangeContent = mongoose.model('OrangeContent');
exports.OrangeType = mongoose.model('OrangeType');
exports.OrangeSMS = mongoose.model('OrangeSMS');
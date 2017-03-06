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
require('../orange.entity/log/log_sms');


exports.LogSMS = mongoose.model('LogSMS');
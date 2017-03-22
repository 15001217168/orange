var mongoose = require('./repository').mongoose;
// models
require('../orange.entity/log/log_sms');


exports.LogSMS = mongoose.model('LogSMS');
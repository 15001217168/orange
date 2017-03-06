var repository = require('../orange.repository/log_repository'),
    config = require('../config'),
    moment = require('moment'),
    utils = require('../orange/utils'),
    LogSMS = repository.LogSMS

exports.addSMSLog = function(phone, verification_code, request, response, error) {
    var item = new LogSMS();
    item.phone = phone;
    item.verification_code = verification_code;
    item.request = request;
    item.response = response;
    item, error = error;
    item.save();
};
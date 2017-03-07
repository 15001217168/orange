var repository = require('../orange.repository/orange_repository'),
    bizResultMsg = require('../orange/result/result').BizResult,
    config = require('../config'),
    moment = require('moment'),
    utils = require('../orange/utils'),
    OrangeSMS = repository.OrangeSMS;

exports.saveSMS = function(phone, verify_code) {
    OrangeSMS.findOne({
        phone: phone,
        is_blocked: false,
        is_deleted: false
    }, function(err, res) {
        if (err) {
            res = new OrangeSMS();
        }
        if (!res) {
            res = new OrangeSMS();
        }
        res.verification_code = verify_code;
        res.phone = phone;
        res.expire_date = new Date();
        res.update_date = new Date();
        res.save();
    });
};
exports.verifyCode = function(phone, code, callback) {
    OrangeSMS.findOne({
        phone: phone,
        verification_code: code,
        is_blocked: false,
        is_deleted: false
    }, function(err, res) {
        if (err) {
            callback(bizResultMsg.error('系统内部错误!'));
        }
        if (!res) {
            callback(bizResultMsg.error('还没有发送验证码!'));
        } else {
            var dif = new Date().getTime() - res.expire_date.getTime();
            var seconds = Math.round(dif / 1000);

            if (seconds > config.verification_code_expire) {
                callback(bizResultMsg.error('验证码失效!'));
            } else {
                callback(bizResultMsg.success('验证码验证成功!'));
            }
        }
    });
};
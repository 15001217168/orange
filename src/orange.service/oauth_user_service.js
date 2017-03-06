var repository = require('../orange.repository/oauth_repository'),
    bizResultMsg = require('../orange/result/result').BizResult,
    config = require('../config'),
    moment = require('moment'),
    utils = require('../orange/utils'),
    OauthUser = repository.OauthUser,
    orange_sms_service = require('../orange.service/orange_sms_service');


var User = function(nick_name, phone, pwd, code) {
    this.nick_name = nick_name;
    this.phone = phone;
    this.pwd = pwd;
    this.code = code;
    this.verifyNickName = function(callback) {
        OauthUser.findOne({
            nick_name: this.nick_name,
            is_blocked: false,
            is_deleted: false
        }, function(err, res) {
            if (err) {
                callback(false);
            }
            if (res) {
                callback(true);
            }
            callback(false);
        });
    }
    this.verifyPhone = function(callback) {
        OauthUser.findOne({
            phone: this.phone,
            is_blocked: false,
            is_deleted: false
        }, function(err, res) {
            if (err) {
                callback(false);
            }
            if (res) {
                callback(true);
            }
            callback(false);
        });
    }
};

User.prototype.verify = function(callback) {
    var _self = this;
    _self.verifyNickName(function(res) {
        if (res == false) {
            _self.verifyPhone(function(res) {
                if (res == true) {
                    callback(bizResultMsg.error('手机号已经被注册!'));
                }
            });
        } else {
            callback(bizResultMsg.error('昵称已经被注册'));
        }
    });
    callback(bizResultMsg.success('验证通过'));
};
exports.register = function(nick_name, phone, pwd, code, callback) {
    var user = new User(nick_name, phone, pwd, code);
    user.verify(function(res) {
        if (res.error == false) {
            orange_sms_service.verifyCode(phone, code, function(err) {
                if (err) {
                    callback(bizResultMsg.error('短信验证码验证失败!'));
                }
                var item = new OauthUser();
                item.phone = phone;
                item.pwd = pwd;
                item.nick_name = nick_name;

                item.save(function(err, res) {
                    if (err) {
                        callback(bizResultMsg.error('注册失败!'));
                    }
                    if (!res) {
                        callback(bizResultMsg.error('注册失败!'));
                    }
                    callback(bizResultMsg.success('注册成功'));
                });
            });
        } else {
            callback(res);
        }
    });
};

exports.registerVerify = function(nick_name, phone, pwd, code, callback) {
    var user = new User(nick_name, phone, pwd, code);
    user.verify(callback);
};
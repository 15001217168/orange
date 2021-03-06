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
            } else {
                if (res) {
                    callback(true, res);
                } else {
                    callback(false);
                }
            }
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
            } else {
                if (res) {
                    callback(true, res);
                } else {
                    callback(false);
                }
            }
        });
    }
};

User.prototype.verify = function(callback) {
    var _self = this;
    _self.verifyNickName(function(vn) {
        if (vn == false) {
            _self.verifyPhone(function(vp) {
                if (vp == true) {
                    callback(bizResultMsg.error('手机号已经被注册!'));
                } else {
                    callback(bizResultMsg.success('验证通过'));
                }
            });
        } else {
            callback(bizResultMsg.error('昵称已经被注册'));
        }
    });

};
exports.login = function(phone, pwd, callback) {
    var user = new User("", phone, pwd, "");
    user.verifyPhone(function(res, doc) {
        if (res == true) {
            if (doc.pwd == pwd) {
                var user_token = utils.createUniqueId(32),
                    now = new Date(),
                    expire_date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + config.user_token_expire, now.getMinutes(), now.getSeconds());
                OauthUser.findByIdAndUpdate(doc._id, {
                    user_token: user_token,
                    expire_date: expire_date,
                }, { new: true }, function(err, doc) {
                    if (!err) {
                        callback(bizResultMsg.success('登录成功!', {
                            user_token: {
                                token: user_token,
                                expire_date: new Date(doc.expire_date).getTime()
                            },
                            phone: doc.phone,
                            nick_name: doc.nick_name,
                            avatar: doc.avatar,

                        }));
                    } else {
                        callback(bizResultMsg.error('系统内部异常,登录失败!'));
                    }
                });

            } else {
                callback(bizResultMsg.error('账户和密码不正确!'));
            }
        } else {
            callback(bizResultMsg.error('不存在该用户,请进行注册!'));
        }
    });
};
exports.getUserInfo = function(user_token, callback) {
    OauthUser.findOne({ user_token: user_token }, function(err, doc) {
        if (err) {
            callback(bizResultMsg.error('未查找到用户信息!'));
        } else {
            if (doc) {
                callback(bizResultMsg.success('获取用户信息成功!', {
                    phone: doc.phone,
                    nick_name: doc.nick_name,
                    avatar: doc.avatar,
                    signature: doc.signature,
                    city: doc.city,
                    birthday: doc.birthday,
                    gender: doc.gender,
                    is_hide_birthday: doc.is_hide_birthday || 0,
                    is_hide_gender: doc.is_hide_gender || 0
                }));
            } else {
                callback(bizResultMsg.error('未查找到用户信息!'));
            }
        }
    });
};
exports.getUserByUserToken = function(user_token, callback) {
    OauthUser.findOne({ user_token: user_token }, function(err, doc) {
        if (err) {
            callback(bizResultMsg.error('未查找到用户信息!'));
        } else {
            if (doc) {
                callback(bizResultMsg.success('获取用户信息成功!', {
                    expire_date: doc.expire_date,
                    token: doc.user_token
                }));
            } else {
                callback(bizResultMsg.error('未查找到用户信息!'));
            }
        }
    });
};
exports.getUserIdByUserToken = function(user_tokne, callback) {
    OauthUser.findOne({ user_token: user_tokne }, function(err, doc) {
        if (err) {
            callback('0');
        } else {
            if (doc) {
                callback(doc._id);
            } else {
                callback('0');
            }
        }
    });
};
exports.saveUserInfo = function(user_token, nick_name, avatar, signature, city_code, city_name, birthday, gender_code, gender_name, is_hide_gender, is_hide_birthday,
    callback) {
    OauthUser.findOneAndUpdate({ user_token: user_token }, {
        nick_name: nick_name,
        avatar: avatar,
        signature: signature,
        city: {
            code: city_code,
            name: city_name
        },
        birthday: birthday,
        gender: {
            code: gender_code,
            name: gender_name
        },
        is_hide_gender: is_hide_gender || 0,
        is_hide_birthday: is_hide_birthday || 0
    }, { new: true }, function(err, doc) {
        if (err) {
            callback(bizResultMsg.error('修改用户信息失败!'));
        } else {
            if (doc) {
                callback(bizResultMsg.success('修改用户信息成功!', {
                    phone: doc.phone,
                    nick_name: doc.nick_name,
                    avatar: doc.avatar,
                    signature: doc.signature,
                    city: doc.city,
                    birthday: doc.birthday,
                    gender: doc.gender,
                    is_hide_gender: doc.is_hide_gender || 0,
                    is_hide_birthday: doc.is_hide_birthday || 0,
                }));
            } else {
                callback(bizResultMsg.error('修改用户信息失败!'));
            }
        }
    });
};
exports.register = function(nick_name, phone, pwd, code, app_id, callback) {
    var user = new User(nick_name, phone, pwd, code);
    user.verify(function(res) {
        if (res.error == false) {
            orange_sms_service.verifyCode(phone, code, function(result) {
                if (result.error) {
                    callback(bizResultMsg.error('短信验证码验证失败!'));
                } else {
                    var item = new OauthUser();
                    item.phone = phone;
                    item.pwd = pwd;
                    item.nick_name = nick_name;
                    item.app_id = app_id;

                    item.save(function(err, res) {
                        if (err) {
                            callback(bizResultMsg.error('注册失败!'));
                        } else {
                            if (!res) {
                                callback(bizResultMsg.error('注册失败!'));
                            } else {
                                callback(bizResultMsg.success('注册成功'));
                            }
                        }
                    });
                }
            });
        } else {
            callback(res);
        }
    });
};

exports.updatePwd = function(phone, pwd, code, callback) {
    var user = new User("", phone, pwd, code);
    user.verifyPhone(function(res, doc) {
        if (res == true) {
            orange_sms_service.verifyCode(phone, code, function(result) {
                if (result.error) {
                    callback(bizResultMsg.error('短信验证码验证失败!'));
                } else {
                    doc.pwd = pwd;
                    doc.save(function(err, res) {
                        if (err) {
                            callback(bizResultMsg.error('修改失败!'));
                        }
                        if (!res) {
                            callback(bizResultMsg.error('修改失败!'));
                        } else {
                            callback(bizResultMsg.success('修改成功'));
                        }
                    });
                }
            });
        } else {
            callback(bizResultMsg.error('未找到该用户!'));
        }
    });
};

exports.registerVerify = function(nick_name, phone, pwd, code, callback) {
    var user = new User(nick_name, phone, pwd, code);
    user.verify(callback);
};
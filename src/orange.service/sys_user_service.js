var repository = require('../orange.repository/sys_repository'),
    bizResultMsg = require('../orange/result/result').BizResult,
    crypto = require('crypto'),
    config = require('../config'),
    moment = require('moment'),
    utils = require('../orange/utils'),
    SysUser = repository.SysUser;

exports.login = function(loginname, pwd, callback) {
    SysUser.findOne({
        name: loginname,
        is_blocked: false,
        is_deleted: false
    }, function(err, user) {
        if (err) {
            callback(bizResultMsg.error('系统内部错误!'));
        }
        if (user) {
            var md5 = crypto.createHash("md5");
            md5.update(pwd);
            if (md5.digest("hex") == user.pwd) {
                callback(bizResultMsg.success('登陆成功!', { username: user.name }));
            } else {
                callback(bizResultMsg.error('用户名密码不正确!'));
            }
        } else {
            callback(bizResultMsg.error('不存在该用户!'));
        }
    });
};

exports.register = function(name, pwd, callback) {
    var sysUser = new SysUser(),
        md5 = crypto.createHash("md5");
    sysUser.name = name;
    md5.update(pwd);
    sysUser.pwd = md5.digest('hex');

    sysUser.save(function(err, doc) {
        if (err) {
            callback(bizResultMsg.error('保存失败!'));
        }
        if (!doc) {
            callback(bizResultMsg.error('保存失败!'));
        } else {
            callback(bizResultMsg.success('保存成功', doc));
        }
    });
};
exports.getUserById = function(id, callback) {
    var data = {
        id: 0,
        name: "",
        pwd: ""
    };
    if (id != 0) {
        SysUser.findById(id, function(err, doc) {
            if (err) {
                callback(bizResultMsg.success('获取数据成功', data));
            } else {
                data.id = doc._id;
                data.name = doc.name;
                data.pwd = doc.pwd;
                callback(bizResultMsg.success('获取数据成功', data));
            }
        });
    } else {
        callback(bizResultMsg.success('获取数据成功', data));
    }
};

exports.getUsers = function(pageindex, key, callback) {
    var size = config.page_size,
        start = (pageindex - 1) * size,
        search = {},
        pagination = {
            index: pageindex,
            size: size,
            pages: 0,
            total: 0,
        },
        list = [];

    if (key) {
        search.name = key;
    }
    SysUser.find(search).skip(start).limit(size).exec(function(err, docs) {
        if (err) {
            callback(bizResultMsg.success('获取数据成功', [], pagination));
        }

        if (docs) {
            list = docs.map(function(v, i) {
                var item = {};
                item._id = v._id;
                item.no = start + i + 1;
                item.name = v.name;
                item.create_date = moment(v.create_date).format('YYYY- MM - DD HH:mm:ss');
                return item;
            });
        }
        SysUser.find(search, function(err, doc) {
            if (err) {
                callback(bizResultMsg.success('获取数据成功', [], pagination));
            }
            var totalCount = doc.length;
            pagination.pages = parseInt((totalCount + size - 1) / size);
            pagination.total = totalCount;

            callback(bizResultMsg.success('获取数据成功', list, pagination));
        });

    });
};

exports.saveUser = function(id, name, pwd, callback) {
    var item = new SysUser(),
        md5 = crypto.createHash("md5");
    if (id != 0) {
        md5.update(pwd);
        SysUser.findByIdAndUpdate(id, {
            update_date: new Date(),
            name: name,
            pwd: md5.digest('hex'),
        }, function(err, doc) {
            if (err) {
                callback(bizResultMsg.error('保存失败!'));
            }
            if (!doc) {
                callback(bizResultMsg.error('保存失败!'));
            } else {
                callback(bizResultMsg.success('保存成功', doc));
            }
        });
    } else {

        item.name = name;
        md5.update(pwd);
        item.pwd = md5.digest('hex');

        item.save(function(err, doc) {
            if (err) {
                callback(bizResultMsg.error('保存失败!'));
            }
            if (!doc) {
                callback(bizResultMsg.error('保存失败!'));
            } else {
                callback(bizResultMsg.success('保存成功', doc));
            }
        });
    }
};
var repository = require('../orange.repository/oauth_repository'),
    bizResultMsg = require('../orange/result/result').BizResult,
    config = require('../config'),
    moment = require('moment'),
    utils = require('../orange/utils'),
    OauthClient = repository.OauthClient;

exports.getClientByAppId = function(appid, callback) {
    OauthClient.findOne({
        app_id: appid,
        is_blocked: false,
        is_deleted: false
    }, function(err, doc) {
        if (err) {
            callback(bizResultMsg.error('系统内部异常'));
        } else {
            if (doc) {
                callback(bizResultMsg.success('获取成功', doc));
            } else {
                callback(bizResultMsg.error('未查找到该客户端'));
            }
        }
    });
};
exports.getClientById = function(id, callback) {
    var data = {
        id: 0,
        name: "",
        type: ""
    };
    if (id != 0) {
        OauthClient.findById(id, function(err, doc) {
            if (err) {
                callback(bizResultMsg.success('操作成功', data));
            } else {
                data.id = doc._id;
                data.name = doc.name;
                data.type = doc.type;
                callback(bizResultMsg.success('操作成功', data));
            }
        });
    } else {
        callback(bizResultMsg.success('操作成功', data));
    }
};

exports.getClients = function(pageindex, key, callback) {
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
    OauthClient.find(search).skip(start).limit(size).exec(function(err, docs) {
        if (err) {
            callback(bizResultMsg.success('操作成功', [], pagination));
        } else {
            if (docs) {
                list = docs.map(function(v, i) {
                    var item = {};
                    item._id = v._id;
                    item.no = start + i + 1;
                    item.name = v.name;
                    item.type = v.type;
                    item.appid = v.app_id;
                    item.app_secret = v.app_secret;
                    item.create_date = moment(v.create_date).format('YYYY- MM - DD HH:mm:ss');
                    return item;
                });
            }
            OauthClient.find(search, function(err, doc) {
                if (err) {
                    callback(bizResultMsg.success('操作成功', [], pagination));
                }
                var totalCount = doc.length;
                pagination.pages = parseInt((totalCount + size - 1) / size);
                pagination.total = totalCount;
                callback(bizResultMsg.success('操作成功', list, pagination));
            });
        }
    });
};

exports.saveClient = function(id, name, type, callback) {
    var item = new OauthClient();
    if (id != 0) {
        OauthClient.findByIdAndUpdate(id, {
            update_date: new Date(),
            name: name,
            type: type,
        }, { new: true }, function(err, doc) {
            if (err) {
                callback(bizResultMsg.error('保存失败'));
            } else {
                if (doc) {
                    callback(bizResultMsg.success('保存成功', doc));
                } else {
                    callback(bizResultMsg.error('保存失败'));
                }
            }
        });
    } else {
        item.name = name;
        item.type = type;
        item.app_id = "or" + utils.createUniqueId(7);
        item.app_secret = utils.createUniqueId(32);
        item.aes_key = utils.createUniqueId(20);
        item.save(function(err, doc) {
            if (err) {
                callback(bizResultMsg.error('保存失败'));
            } else {
                if (doc) {
                    callback(bizResultMsg.success('保存成功', doc));
                } else {
                    callback(bizResultMsg.error('保存失败'));
                }
            }
        });
    }
};
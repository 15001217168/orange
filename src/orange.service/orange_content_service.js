var repository = require('../orange.repository/orange_repository'),
    bizResultMsg = require('../orange/result/result').BizResult,
    config = require('../config'),
    moment = require('moment'),
    utils = require('../orange/utils'),
    OrangeContent = repository.OrangeContent;

exports.getContentById = function(id, callback) {
    var data = {
        id: 0,
        name: ""
    };
    if (id != 0) {
        OrangeContent.findById(id, function(err, doc) {
            if (err) {
                callback(bizResultMsg.success('获取数据成功', data));
            } else {
                data.id = doc._id;
                data.name = doc.name;
                callback(bizResultMsg.success('获取数据成功', data));
            }
        });
    } else {
        callback(bizResultMsg.success('获取数据成功', data));
    }
};

exports.getContents = function(pageindex, key, callback) {
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
    OrangeContent.find(search).skip(start).limit(size).exec(function(err, docs) {
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
        OrangeContent.find(search, function(err, doc) {
            if (err) {
                callback(bizResultMsg.success('获取数据成功', [], pagination));
            } else {
                var totalCount = doc.length;
                pagination.pages = parseInt((totalCount + size - 1) / size);
                pagination.total = totalCount;

                callback(bizResultMsg.success('获取数据成功', list, pagination));
            }
        });

    });
};

exports.saveContent = function(id, name, callback) {
    var item = new OrangeContent();
    if (id != 0) {
        OrangeContent.findByIdAndUpdate(id, {
            update_date: new Date(),
            name: name,
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
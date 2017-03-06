var repository = require('../orange.repository/orange_repository'),
    bizResultMsg = require('../orange/result/result').BizResult,
    config = require('../config'),
    moment = require('moment'),
    utils = require('../orange/utils'),
    OrangeType = repository.OrangeType;

exports.getTypeById = function(id, callback) {
    var data = {
        id: 0,
        name: ""
    };
    if (id != 0) {
        OrangeType.findById(id, function(err, doc) {
            if (err) {
                callback(bizResultMsg.success('获取数据成功', data));
            }
            data.id = doc._id;
            data.name = doc.name;
            callback(bizResultMsg.success('获取数据成功', data));
        });
    } else {
        callback(bizResultMsg.success('获取数据成功', data));
    }
};

exports.getTypes = function(pageindex, key, callback) {
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
    OrangeType.find(search).skip(start).limit(size).exec(function(err, docs) {
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
        OrangeType.find(search, function(err, doc) {
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

exports.saveType = function(id, name, callback) {
    var item = new OrangeType();
    if (id != 0) {
        OrangeType.findByIdAndUpdate(id, {
            update_date: new Date(),
            name: name,
        }, function(err, doc) {
            if (err) {
                callback(bizResultMsg.error('保存失败!'));
            }
            if (!doc) {
                callback(bizResultMsg.error('保存失败!'));
            }
            callback(bizResultMsg.success('保存成功', doc));
        });
    } else {
        item.name = name;
        item.save(function(err, doc) {
            if (err) {
                callback(bizResultMsg.error('保存失败!'));
            }
            if (!doc) {
                callback(bizResultMsg.error('保存失败!'));
            }
            callback(bizResultMsg.success('保存成功', doc));
        });
    }
};
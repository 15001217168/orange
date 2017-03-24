var repository = require('../orange.repository/orange_repository'),
    bizResultMsg = require('../orange/result/result').BizResult,
    config = require('../config'),
    moment = require('moment'),
    utils = require('../orange/utils'),
    OrangeType = repository.OrangeType;

exports.getTypeById = function(id, callback) {
    var data = {
        id: 0,
        name: "",
        type: {},
        des: "",
        img: "",
    };
    if (id != 0) {
        OrangeType.findById(id, function(err, doc) {
            if (err) {
                callback(bizResultMsg.success('获取数据成功', data));
            }
            data.id = doc._id;
            data.name = doc.name;
            data.type = doc.type;
            data.des = doc.des;
            data.img = doc.img;
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
                item.type = v.type.name;
                item.content_count = v.content_count;
                item.focus_count = v.focus_count;
                item.des = v.des;
                item.img = v.img;
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

exports.searchTypes = function(key, callback) {
    var list = [],
        search = {};
    if (key) {
        var pattern = new RegExp("^.*" + key + ".*$");
        search.name = pattern;
        OrangeType.find(search).exec(function(err, docs) {
            if (err) {
                callback(bizResultMsg.success('获取数据成功', list));
            }
            if (docs) {
                list = docs.map(function(v, i) {
                    var item = {};
                    item._id = v._id;
                    item.name = v.name;
                    return item;
                });
            }
            callback(bizResultMsg.success('获取数据成功', list));
        });
    } else {
        callback(bizResultMsg.success('获取数据成功', list));
    }
};

exports.saveType = function(id, name, type, des, img, callback) {
    if (id != 0) {
        OrangeType.findByIdAndUpdate(id, {
            update_date: new Date(),
            name: name,
            type: type,
            des: des,
            img: img
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
        var item = new OrangeType();
        item.name = name;
        item.type = type;
        item.des = des;
        item.img = img;
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
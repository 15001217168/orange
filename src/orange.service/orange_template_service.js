var repository = require('../orange.repository/orange_repository'),
    bizResultMsg = require('../orange/result/result').BizResult,
    config = require('../config'),
    moment = require('moment'),
    utils = require('../orange/utils'),
    OrangeTemplate = repository.OrangeTemplate,
    OrangeTemplateContent = repository.OrangeTemplateContent;

exports.getTemplateById = function(id, callback) {
    var data = {
        id: 0,
        name: "",
        code: "",
        des: "",
        type: {
            code: "",
            name: ""
        },
    };
    if (id != 0) {
        OrangeTemplate.findById(id, function(err, doc) {
            if (err) {
                callback(bizResultMsg.success('获取数据成功', data));
            }
            data.id = doc._id;
            data.name = doc.name;
            data.code = doc.code;
            data.type = doc.type;
            data.des = doc.des;
            callback(bizResultMsg.success('获取数据成功', data));
        });
    } else {
        callback(bizResultMsg.success('获取数据成功', data));
    }
};

exports.getTemplates = function(pageindex, key, callback) {
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
    OrangeTemplate.find(search).skip(start).limit(size).exec(function(err, docs) {
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
                item.code = v.code;
                item.des = v.des;
                item.is_blocked = v.is_blocked;
                item.create_date = moment(v.create_date).format('YYYY- MM - DD HH:mm:ss');
                return item;
            });
        }
        OrangeTemplate.find(search, function(err, doc) {
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

exports.saveTemplate = function(id, name, type, des, code, callback) {
    if (id != 0) {
        OrangeTemplate.findByIdAndUpdate(id, {
            update_date: new Date(),
            name: name,
            type: type,
            des: des,
            code: code
        }, function(err, doc) {
            if (err) {
                callback(bizResultMsg.error('保存失败!'));
            } else {
                if (!doc) {
                    callback(bizResultMsg.error('保存失败!'));
                } else {
                    callback(bizResultMsg.success('保存成功', doc));
                }
            }
        });
    } else {
        var item = new OrangeTemplate();
        item.name = name;
        item.type = type;
        item.des = des;
        item.code = code;
        item.save(function(err, doc) {
            if (err) {
                callback(bizResultMsg.error('保存失败!'));
            } else {
                if (!doc) {
                    callback(bizResultMsg.error('保存失败!'));
                } else {
                    callback(bizResultMsg.success('保存成功', doc));
                }
            }
        });
    }
};
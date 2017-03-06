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
                callback(err, data);
            }
            data.id = doc._id;
            data.name = doc.name;
            callback(null, data);
        });
    } else {
        callback(null, data);
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
            callback(err, [], pagination);
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
                callback(err, [], pagination);
            }
            var totalCount = doc.length;
            pagination.pages = parseInt((totalCount + size - 1) / size);
            pagination.total = totalCount;

            callback(null, list, pagination);
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
            callback(err, doc);
        });
    } else {
        item.name = name;
        item.save(function(err, doc) {
            callback(err, doc);
        });
    }
};
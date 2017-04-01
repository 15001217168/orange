var orange_repository = require('../orange.repository/orange_repository'),
    oauth_repository = require('../orange.repository/oauth_repository'),
    bizResultMsg = require('../orange/result/result').BizResult,
    config = require('../config'),
    moment = require('moment'),
    utils = require('../orange/utils'),
    OrangeContent = orange_repository.OrangeContent,
    OrangeType = orange_repository.OrangeType,
    OauthUser = oauth_repository.OauthUser,
    cheerio = require('cheerio'),
    OauthUserService = require('./oauth_user_service');

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
//获取用户保存内容列表
exports.getUserContentList = function(user_token, page_index, page_size, key, type_id, callback) {
    var size = parseInt(page_size),
        start = (page_index - 1) * size,
        search = {},
        pagination = {
            index: page_index,
            size: size,
            pages: 0,
            total: 0,
        },
        list = [];

    if (key) {
        var pattern = new RegExp("^.*" + key + ".*$");
        search.title = pattern;
    }
    if (type_id) {
        search.type_id = type_id;
    }
    search.is_deleted = false;
    OauthUserService.getUserIdByUserToken(user_token, function(user_id) {
        search.user_id = user_id;
        OrangeContent.find(search).skip(start).limit(size).exec(function(err, docs) {
            if (err) {
                callback(bizResultMsg.success('获取数据成功', [], pagination));
            } else {
                if (docs) {
                    list = docs.map(function(v, i) {
                        var item = {};
                        item.id = v._id;
                        item.title = v.title;
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
            }
        });
    });
};

//获取用户内容
exports.getUserContentDetailById = function(user_token, content_id, callback) {
    if (content_id) {
        OrangeContent.findById(content_id, function(err, doc) {
            if (err) {
                callback(bizResultMsg.error('为查找到指定Id的内容'));
                return;
            } else {
                if (doc) {
                    OauthUserService.getUserIdByUserToken(user_token, function(user_id) {
                        if (user_id == doc.user_id) {
                            var data = {};
                            data.id = doc._id;
                            data.title = doc.title;
                            data.content = doc.content;
                            data.markdown = doc.markdown;
                            data.type_id = doc.type_id;
                            callback(bizResultMsg.success('获取数据成功', data));
                            return;
                        } else {
                            callback(bizResultMsg.error('该Id的内容为其他用户所有，您没有权限查看！'));
                            return;
                        }
                    });

                } else {
                    callback(bizResultMsg.error('为查找到指定Id的内容'));
                    return;
                }
            }
        });
    } else {
        callback(bizResultMsg.error('为查找到指定Id的内容'));
        return;
    }
};

//用户内容删除
exports.updateUserContentDeleted = function(user_token, content_id, callback) {
    OauthUserService.getUserIdByUserToken(user_token, function(user_id) {
        if (user_id != '0') {
            OrangeContent.findByIdAndUpdate(content_id, {
                update_date: new Date(),
                is_deleted: true
            }, { new: true }, function(err, doc) {
                if (err) {
                    callback(bizResultMsg.error('删除失败!'));
                }
                if (!doc) {
                    callback(bizResultMsg.error('删除失败!'));
                } else {
                    callback(bizResultMsg.success('删除成功', doc));
                }
            });
        } else {
            callback(bizResultMsg.error('该Id的内容为其他用户所有，您没有权限删除！'));
            return;
        }
    });
};
exports.saveContent = function(contentid, title, content, markdown, user_token, typeid, callback) {
    var item = new OrangeContent(),
        typeid = typeid || '0000',
        user_id = '0000',
        $ = cheerio.load(decodeURIComponent(content));

    var img = $('img').first().attr("src") || "",
        des = $('p').first().text();
    OauthUser.findOne({ user_token: user_token }, function(err, doc) {
        if (!err) {
            if (doc) {
                user_id = doc._id;
                if (contentid != 0) {
                    OrangeContent.findByIdAndUpdate(contentid, {
                        update_date: new Date(),
                        title: title,
                        img: img,
                        des: des,
                        content: content,
                        markdown: markdown,
                        type_id: typeid,
                        user_id: user_id,
                    }, { new: true }, function(err, doc) {
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
                    item.title = title;
                    item.img = img;
                    item.des = des;
                    item.content = content;
                    item.markdown = markdown;
                    item.type_id = typeid;
                    item.user_id = user_id;
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
            } else {
                callback(bizResultMsg.error('该Id的内容为其他用户所有，您没有权限修改！'));
            }
        } else {
            callback(bizResultMsg.error('该Id的内容为其他用户所有，您没有权限修改！'));
        }
    });

};
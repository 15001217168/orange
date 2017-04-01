var bizResult = require('../../../orange/result/result').BizResult,
    utils = require('../../../orange/utils');

module.exports = function(router) {
    router.get('/writer', function(req, res, next) {
        res.render('writer');
    });
    //保存
    router.post('/save_content', function(req, res, next) {
        var title = req.body.title,
            content = req.body.content,
            markdown = req.body.markdown,
            typeid = req.body.typeid,
            content_id = req.body.content_id;
        utils.httpPost('/api/save_user_content', {
            content_id: content_id || 0,
            title: title,
            content: content,
            markdown: markdown,
            type_id: typeid
        }, req.user.user_token.token, function(result) {
            if (result.error) {
                res.send(bizResult.error(result.message));
                return;
            } else {
                if (result.data.code == '0000') {
                    res.send(bizResult.success(result.data.message, result.data.data));
                    return;
                } else {
                    res.send(bizResult.error(result.data.message));
                    return;
                }
            }
        });
    });
    //获取所有
    router.post('/get_user_contents', function(req, res, next) {
        var page_index = req.body.page_index,
            page_size = req.body.page_size,
            key = req.body.key,
            typeid = req.body.type_id;
        utils.httpPost('/api/get_user_contents', {
            page_index: page_index,
            page_size: page_size,
            key: key,
            type_id: typeid
        }, req.user.user_token.token, function(result) {
            if (result.error) {
                res.send(bizResult.error(result.message));
                return;
            } else {
                if (result.data.code == '0000') {
                    res.send(bizResult.success(result.data.message, result.data.data.list, result.data.data.pagination));
                    return;
                } else {
                    res.send(bizResult.error(result.data.message));
                    return;
                }
            }
        });
    });
    //获取详情
    router.post('/get_user_content_detail', function(req, res, next) {
        var content_id = req.body.content_id;
        utils.httpPost('/api/get_user_content_detail', {
            content_id: content_id
        }, req.user.user_token.token, function(result) {
            if (result.error) {
                res.send(bizResult.error(result.message));
                return;
            } else {
                if (result.data.code == '0000') {
                    res.send(bizResult.success(result.data.message, result.data.data));
                    return;
                } else {
                    res.send(bizResult.error(result.data.message));
                    return;
                }
            }
        });
    });
    //删除
    router.post('/delete_content', function(req, res, next) {
        var content_id = req.body.content_id;
        utils.httpPost('/api/deleted_user_content', {
            content_id: content_id
        }, req.user.user_token.token, function(result) {
            if (result.error) {
                res.send(bizResult.error(result.message));
                return;
            } else {
                if (result.data.code == '0000') {
                    res.send(bizResult.success(result.data.message));
                    return;
                } else {
                    res.send(bizResult.error(result.data.message));
                    return;
                }
            }
        });
    });
};
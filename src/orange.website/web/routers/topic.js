var bizResult = require('../../../orange/result/result').BizResult,
    utils = require('../../../orange/utils');

module.exports = function(router) {
    router.get('/t', function(req, res, next) {
        res.render('topics', { user: req.user });
    });

    //获取主题列表
    router.post('/get_topics', function(req, res, next) {
        var page_index = req.body.page_index,
            page_size = req.body.page_size,
            key = req.body.key,
            typeid = req.body.type_id;
        utils.httpPost('/api/get_topics', {
            page_index: page_index,
            page_size: page_size,
            key: key,
        }, "", function(result) {
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
};
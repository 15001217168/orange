var bizResultMsg = require('../../../orange/result/result').BizResult,
    orangeContentService = require('../../../orange.service/orange_content_service');

module.exports = function(router) {
    router.get('/content', function(req, res, next) {
        var page_index = req.query.index || 1;
        orangeContentService.getContents(page_index, "", function(result) {
            if (result.error == true) {
                return next(result.message);
            } else {
                res.render('content/index', { username: req.user.username, title: "内容列表", list: result.data, pagination: result.pagination });
            }
        });
    });
    router.get('/content/form', function(req, res, next) {
        var id = req.query.id || 0,
            title = id == 0 ? "添加内容" : "修改内容";
        orangeContentService.getContentById(id, function(result) {
            if (result.error == true) {
                return next(result.message);
            }
            res.render('content/form', { username: req.user.username, title: title, content: result.data });
        });
    });
    router.post('/content/save', function(req, res, next) {
        var id = req.body.id || 0,
            name = req.body.name;
        orangeContentService.saveContent(id, name, function(result) {
            if (result.error == true) {
                return next(result.message);
            }
            res.redirect('/content');
        });
    });
};
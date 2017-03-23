var bizResultMsg = require('../../../orange/result/result').BizResult,
    orangeTemplateService = require('../../../orange.service/orange_template_service');

module.exports = function(router) {
    router.get('/template', function(req, res, next) {
        var page_index = req.query.index || 1;
        orangeTemplateService.getTemplates(page_index, "", function(result) {
            if (result.error == true) {
                return next(result.message);
            }
            res.render('template/index', { username: req.user.username, title: "模板列表", list: result.data, pagination: result.pagination });
        });
    });
    router.get('/template/form', function(req, res, next) {
        var id = req.query.id || 0,
            title = id == 0 ? "添加模板" : "修改模板";
        orangeTemplateService.getTemplateById(id, function(result) {
            if (result.error == true) {
                return next(result.message);
            }
            res.render('template/form', { username: req.user.username, title: title, template: result.data });
        });
    });
    router.get('/template/data', function(req, res, next) {
        var id = req.query.id,
            page_index = req.query.index || 1;
        orangeTemplateService.getTemplateById(id, function(doc) {
            if (doc.error == true) {
                return next(doc.message);
            } else {
                orangeTemplateService.getTemplateContentsByTemplateId(id, page_index, "", function(result) {
                    if (result.error == true) {
                        return next(result.message);
                    } else {
                        res.render('template/data', { username: req.user.username, title: "模板数据", template: doc.data, list: result.data, pagination: result.pagination });
                    }
                });
            }
        });
    });
    router.post('/template/save', function(req, res, next) {
        var id = req.body.id || 0,
            name = req.body.name,
            type = { code: req.body.typeid, name: req.body.typename },
            des = req.body.des,
            code = req.body.code;
        orangeTemplateService.saveTemplate(id, name, type, des, code, function(result) {
            if (result.error == true) {
                return next(result.message);
            } else {
                res.send(bizResultMsg.success('保存成功'));
                return;
            }
        });
    });

    router.post('/template/switch', function(req, res, next) {
        var id = req.body.id,
            is_blocked = req.body.is_blocked;
        orangeTemplateService.switch(id, is_blocked, function(result) {
            if (result.error == true) {
                return next(result.message);
            } else {
                res.send(bizResultMsg.success('保存成功'));
                return;
            }
        });
    });
};
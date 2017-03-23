var bizResultMsg = require('../../../orange/result/result').BizResult,
    orangeTypeService = require('../../../orange.service/orange_type_service');

module.exports = function(router) {
    router.get('/type', function(req, res, next) {
        var page_index = req.query.index || 1;
        orangeTypeService.getTypes(page_index, "", function(result) {
            if (result.error == true) {
                return next(result.message);
            }
            res.render('type/index', { username: req.user.username, title: "类型列表", list: result.data, pagination: result.pagination });
        });
    });
    router.get('/type/form', function(req, res, next) {
        var id = req.query.id || 0,
            title = id == 0 ? "添加类型" : "修改类型";
        orangeTypeService.getTypeById(id, function(result) {
            if (result.error == true) {
                return next(result.message);
            }
            res.render('type/form', { username: req.user.username, title: title, type: result.data });
        });
    });
    router.post('/type/save', function(req, res, next) {
        var id = req.body.id || 0,
            name = req.body.name,
            type = { id: req.body.typeid, name: req.body.typename },
            des = req.body.des,
            img = req.body.img;
        orangeTypeService.saveType(id, name, type, des, img, function(result) {
            if (result.error == true) {
                return next(result.message);
            } else {
                res.send(bizResultMsg.success('保存成功'));
                return;
            }
        });
    });
}
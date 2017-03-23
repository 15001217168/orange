var bizResultMsg = require('../../../orange/result/result').BizResult,
    sysUserService = require('../../../orange.service/sys_user_service');

module.exports = function(router) {
    router.get('/user', function(req, res, next) {
        var page_index = req.query.index || 1;
        sysUserService.getUsers(page_index, "", function(result) {
            if (result.error == true) {
                return next(result.message);
            }
            res.render('user/index', { username: req.user.username, title: "系统用户列表", list: result.data, pagination: result.pagination });
        });
    });
    router.get('/user/form', function(req, res, next) {
        var id = req.query.id || 0,
            title = id == 0 ? "添加系统用户" : "修改系统用户";
        sysUserService.getUserById(id, function(result) {
            if (result.error == true) {
                return next(result.message);
            }
            res.render('user/form', { username: req.user.username, title: title, user: result.data });
        });
    });
    router.post('/user/save', function(req, res, next) {
        var id = req.body.id || 0,
            name = req.body.name,
            pwd = req.body.pwd;
        sysUserService.saveUser(id, name, pwd, function(result) {
            if (result.error == true) {
                return next(result.message);
            }
            res.redirect('/user');
        });
    });
};
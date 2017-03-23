var bizResultMsg = require('../../../orange/result/result').BizResult,
    sysUserService = require('../../../orange.service/sys_user_service');

module.exports = function(router) {
    router.get('/reg', function(req, res, next) {
        res.render('register/index')
    });
    router.post('/reg', function(req, res, next) {
        var username = req.body.username;
        var pwd = req.body.pwd;
        var verifypwd = req.body.verifypwd;
        sysUserService.register(username, pwd, function(result) {
            if (result.error == true) {
                return next(result.message);
            }
            res.redirect("/login");
        });
    });
};
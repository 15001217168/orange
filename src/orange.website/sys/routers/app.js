var bizResultMsg = require('../../../orange/result/result').BizResult,
    oauthClientService = require('../../../orange.service/oauth_client_service');

module.exports = function(router) {
    router.get('/app', function(req, res, next) {
        var page_index = req.query.index || 1;
        oauthClientService.getClients(page_index, "", function(result) {
            if (result.error == true) {
                return next(result.message);
            }
            res.render('app/index', { username: req.user.username, title: "应用列表", list: result.data, pagination: result.pagination });
        });
    });
    router.get('/app/form', function(req, res, next) {
        var id = req.query.id || 0,
            title = id == 0 ? "添加应用" : "修改应用";
        oauthClientService.getClientById(id, function(result) {
            if (result.error == true) {
                return next(result.message);
            }
            res.render('app/form', { username: req.user.username, title: title, app: result.data });
        });
    });
    router.post('/app/save', function(req, res, next) {
        var id = req.body.id || 0,
            name = req.body.name,
            type = req.body.type;
        oauthClientService.saveClient(id, name, type, function(result) {
            if (result.error == true) {
                return next(result.message);
            }
            res.redirect('/app');
        });
    });
};
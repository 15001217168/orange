var bizResult = require('../../../orange/result/result').BizResult,
    utils = require('../../../orange/utils');

module.exports = function(router) {
    router.get('/p/:id', function(req, res, next) {
        res.render('detail', { user: req.user });
    });
    router.get('/td/:id', function(req, res, next) {
        var id = req.params.id;
        res.render('list', { user: req.user });
    });
};
var bizResult = require('../../../orange/result/result').BizResult,
    utils = require('../../../orange/utils');

module.exports = function(router) {
    router.get('/p', function(req, res, next) {
        res.render('detail', { user: req.user });
    });
    router.get('/td', function(req, res, next) {
        res.render('list', { user: req.user });
    });
};
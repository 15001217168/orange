var bizResult = require('../../../orange/result/result').BizResult,
    utils = require('../../../orange/utils');

module.exports = function(router) {
    router.get('/', function(req, res, next) {
        res.render('index', { user: req.user });
    });

};
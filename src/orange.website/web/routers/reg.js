var bizResult = require('../../../orange/result/result').BizResult,
    utils = require('../../../orange/utils');

module.exports = function(router) {
    router.get('/reg', function(req, res, next) {
        res.render('reg');
    });
    router.post('/reg', function(req, res, next) {
        utils.httpPost('/api/register', {
            nick_name: req.body.nick_name,
            phone: req.body.phone,
            pwd: req.body.pwd,
            code: req.body.sms_code,
        }, "", function(result) {
            if (result.error) {
                res.send(bizResult.error(result.message));
                return;
            } else {
                if (result.data.code == '0000') {
                    res.send(bizResult.success(result.data.message));
                    return;
                } else {
                    res.send(bizResult.error(result.data.message));
                    return;
                }
            }
        });
    });
};
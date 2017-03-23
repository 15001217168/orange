var bizResult = require('../../../orange/result/result').BizResult,
    utils = require('../../../orange/utils');

module.exports = function(router) {
    router.get('/writer', function(req, res, next) {
        res.render('writer');
    });
    router.post('/save_content', function(req, res, next) {
        utils.httpPost('/api/save_content', {
            phone: req.body.phone,
            access_token: global.web_config.access_token
        }, function(result) {
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
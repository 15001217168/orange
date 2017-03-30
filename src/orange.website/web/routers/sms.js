var bizResult = require('../../../orange/result/result').BizResult,
    utils = require('../../../orange/utils');

module.exports = function(router) {
    router.post('/send_sms', function(req, res, next) {
        utils.httpPost('/api/send_sms_code', {
            phone: req.body.phone,
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
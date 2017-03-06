/**
 * Module dependencies.
 */


var orange_sms_service = require('../../orange.service/orange_sms_service'),
    log_sms_service = require('../../orange.service/log_sms_service'),
    bizResultMsg = require('../result/result').BizResult,
    TopClient = require('./top_client').TopClient;

var client = new TopClient({
    'appkey': '23630453',
    'appsecret': '463814bdc5932b17f92d6d1422abe041',
    'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

exports.sendSms = function(code, phone, callback) {
    var request = {
        'extend': '',
        'sms_type': 'normal',
        'sms_free_sign_name': '橙子',
        'sms_param': "{code:'" + code + "'}",
        'rec_num': phone,
        'sms_template_code': "SMS_45955007"
    };
    client.execute('alibaba.aliqin.fc.sms.num.send', request, function(err, response) {
        log_sms_service.addSMSLog(phone, code, request, response, err);
        if (err) {
            callback(bizResultMsg.error('发送失败!'));
        }
        if (response) {
            if (response.result.err_code == '0') {
                orange_sms_service.saveSMS(phone, code);
                callback(bizResultMsg.success('发送成功'));
            } else {
                callback(bizResultMsg.error('发送失败!'));
            }
        } else {
            callback(bizResultMsg.error('发送失败!'));
        }
    });
};
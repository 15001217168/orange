/**
 * Module dependencies.
 */

TopClient = require('./top_client').TopClient;

var client = new TopClient({
  'appkey': '23630453',
  'appsecret': '463814bdc5932b17f92d6d1422abe041',
  'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

exports.sendSms = function (code, phone, callback) {
  client.execute('alibaba.aliqin.fc.sms.num.send', {
    'extend': '',
    'sms_type': 'normal',
    'sms_free_sign_name': '橙子',
    'sms_param': "{code:'" + code + "'}",
    'rec_num': phone,
    'sms_template_code': "SMS_45955007"
  }, function (err, response) {
    if (err) {
      callback(err, { code: '9999', message: "发送失败", data: {} });
    }
    if (response) {
      if (response.result.err_code == '0') {
        callback(null, { code: '0000', message: "发送成功", data: {} });
      }
      else {
        callback(null, { code: '9999', message: "发送失败", data: {} });
      }
    }
    else {
      callback(null, { code: '9999', message: "发送失败", data: {} });
    }
  });
};

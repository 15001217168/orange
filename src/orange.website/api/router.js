var express = require('express'),
	router = express.Router(),
	util = require('../../orange/utils'),
	oauth2 = require('../../orange.middleware/oauth2'),
	smsUtil = require('../../orange/sms/top_client'),
	sysUserService = require('../../orange.service/sys_user_service');

router.post('/authorize', oauth2.access_token);
router.post('*', oauth2.authorization);
router.post('/api/send_sms_code', function (req, res, next) {
	var phone = req.body.phone;
	if (phone) {
		var code = util.createRandomNumber(6);
		smsUtil.sendSms(code, phone, function (err, result) {
			if (err) {
				res.send({ code: '9999', message: '发送验证码失败', data: {} });
				return;
			}
			if (result.code == '0000') {
				res.send({ code: '0000', message: '发送验证码成功', data: {} });
				return;
			}
			else {
				res.send({ code: '9999', message: '发送验证码失败', data: {} });
				return;
			}
		});
	}
	else {
		res.send({ code: '9999', message: '手机号不能为空', data: {} });
		return;
	}
});
router.post('/api/test', function (req, res, next) {
	res.send({ code: '0000', message: '接口测试成功', data: { test: "测试数据" } });
});


module.exports = router;
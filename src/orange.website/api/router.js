var express = require('express'),
	router = express.Router(),
	util = require('../../orange/utils'),
	oauth2 = require('../../orange.middleware/oauth2'),
	smsUtil = require('../../orange/sms/top_client'),
	sysUserService = require('../../orange.service/sys_user_service');
/**
 * @api {post} /authorize/:appid
 * @apiVersion 0.3.0
 * @apiName 获取授权Token
 * @apiDescription 获取授权Token
 *
 * @apiParam {String} appid 客户端ip
 *
 * @apiExample Example usage:
 * curl -i http://localhost/user/4711
 *
 * @apiSuccess {String}   id            The Users-ID.
 * @apiSuccess {Date}     registered    Registration Date.
 * @apiSuccess {Date}     name          Fullname of the User.
 * @apiSuccess {String[]} nicknames     List of Users nicknames (Array of Strings).
 * @apiSuccess {Object}   profile       Profile data (example for an Object)
 * @apiSuccess {Number}   profile.age   Users age.
 * @apiSuccess {String}   profile.image Avatar-Image.
 * @apiSuccess {Object[]} options       List of Users options (Array of Objects).
 * @apiSuccess {String}   options.name  Option Name.
 * @apiSuccess {String}   options.value Option Value.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
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
var resultMsg = require('../../../orange/result/result').Result,
    util = require('../../../orange/utils'),
    smsUtil = require('../../../orange/sms/top_channel'),
    orange_sms_service = require('../../../orange.service/orange_sms_service');

module.exports = function(router) {

    /**
     * @api {post} /api/send_sms_code 发送验证码
     * @apiName send_sms_code
     * @apiGroup API
     *
     * @apiParam {String} phone 手机号.
     * @apiHeader {String} access_token Token.
     *
     * @apiSuccess {String} code 状态码.
     * @apiSuccess {String} message 错误信息.
     * @apiSuccess {Object} data 数据.
     * @apiSuccessExample 成功: 
     * { 
     *  code:'0000', 
     *  message:'发送验证码成功', 
     *  data:{} 
     *  } 
     *  @apiErrorExample 失败: 
     *  { 
     *   code:'9999', 
     *   message:'发送验证码失败', 
     *   data:{} 
     *   } 
     * @apiParamExample {json} 请求示例:
     *     {
     *       "phone": '123456',
     *       "access_token": '123456'
     *     }
     */
    router.post('/api/send_sms_code', function(req, res, next) {
        var phone = req.body.phone;
        if (!phone) {
            res.send(resultMsg.required('手机号不能为空'));
            return;
        }
        if (!reg_verify.verifyPhone(phone)) {
            res.send(resultMsg.required('手机号格式不正确'));
            return;
        }
        var code = util.createRandomNumber(6);
        smsUtil.sendSms(code, phone, function(result) {
            if (result.error == true) {
                res.send(resultMsg.fail('发送验证码失败'));
                return;
            } else {
                res.send(resultMsg.success('发送验证码成功'));
                return;
            }
        });
    });

    /**
     * @api {post} /api/verify_sms_code 验证码验证
     * @apiName verify_sms_code
     * @apiGroup API
     *
     * @apiParam {String} phone 手机号.
     * @apiParam {String} code 验证码.
     * @apiHeader {String} access_token Token.
     *
     * @apiSuccess {String} code 状态码.
     * @apiSuccess {String} message 错误信息.
     * @apiSuccess {Object} data 数据.
     * @apiSuccessExample 成功: 
     * { 
     *  code:'0000', 
     *  message:'验证成功', 
     *  data:{} 
     *  } 
     *  @apiErrorExample 失败: 
     *  { 
     *   code:'9999', 
     *   message:'验证失败', 
     *   data:{} 
     *   } 
     * @apiParamExample {json} 请求示例:
     *     {
     *       "phone": '123456',
     *       "code":'123456',
     *       "access_token": '123456'
     *     }
     */
    router.post('/api/verify_sms_code', function(req, res, next) {
        var phone = req.body.phone,
            code = req.body.code;
        if (!phone) {
            res.send(resultMsg.required('手机号不能为空'));
            return;
        }
        if (!reg_verify.verifyPhone(phone)) {
            res.send(resultMsg.required('手机号格式不正确'));
            return;
        }
        if (!code) {
            res.send(resultMsg.required('短信验证码不能为空'));
            return;
        }
        if (!reg_verify.verifySmsCode(code)) {
            res.send(resultMsg.required('短信验证码为6位数字'));
            return;
        }
        orange_sms_service.verifyCode(phone, code, function(result) {
            if (result.error == true) {
                res.send(resultMsg.fail(result.message));
                return;
            } else {
                res.send(resultMsg.success('验证成功'));
                return;
            }
        });
    });
}
var express = require('express'),
    router = express.Router(),
    util = require('../../orange/utils'),
    oauth2 = require('../../orange.middleware/oauth2'),
    smsUtil = require('../../orange/sms/top_channel'),
    segment_utils = require('../../orange/segment/segment_utils'),
    sysUserService = require('../../orange.service/sys_user_service');
/**
 * @api {post} /api/authorize 获取Token
 * @apiName authorize
 * @apiGroup OAuth
 *
 * @apiParam {String} appid 客户端Appid.
 * @apiParam {String} timespan 时间戳.
 * @apiParam {String} noncestr 随机字符串.
 * @apiParam {String} sign 签名.
 *
 * @apiSuccess {String} code 状态码.
 * @apiSuccess {String} message 错误信息.
 * @apiSuccess {Object} data 数据.
 * @apiSuccessExample 成功: 
 * { 
 *  code:'0000', 
 *  message:'验证客户端成功', 
 *  data:{  access_token: 'access_token' } 
 *  } 
 *  @apiErrorExample 失败: 
 *  { 
 *   code:'9999', 
 *   message:'操作失败', 
 *   data:{} 
 *   } 
 * @apiExample  链接:
 *  http://192.168.1.89:8810/api/authorize
 * @apiParamExample {json} 请求示例:
 *     {
 *       "appid": '123456',
 *       "timespan": '123456',
 *       "noncestr": '123456',
 *       "sign": '123456'
 *     }
 * @apiSampleRequest http://192.168.1.89:8810/api/authorize
 */
router.post('/api/authorize', oauth2.access_token);

router.post('*', oauth2.authorization);

/**
 * @api {post} /api/send_sms_code 发送验证码
 * @apiName send_sms_code
 * @apiGroup Message
 *
 * @apiParam {String} phone 手机号.
 * @apiParam {String} access_token Token.
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
 * @apiExample  链接:
 *  http://192.168.1.89:8810/api/send_sms_code
 * @apiParamExample {json} 请求示例:
 *     {
 *       "phone": '123456',
 *       "access_token": '123456',
 *     }
 * @apiSampleRequest http://192.168.1.89:8810/api/send_sms_code
 */
router.post('/api/send_sms_code', function(req, res, next) {
    var phone = req.body.phone;
    if (!phone) {
        res.send({ code: '9999', message: '手机号不能为空', data: {} });
        return;
    }
    var code = util.createRandomNumber(6);
    smsUtil.sendSms(code, phone, function(err, result) {
        if (err) {
            res.send({ code: '9999', message: '发送验证码失败', data: {} });
            return;
        }
        if (result.code == '0000') {
            res.send({ code: '0000', message: '发送验证码成功', data: {} });
            return;
        } else {
            res.send({ code: '9999', message: '发送验证码失败', data: {} });
            return;
        }
    });
});
/**
 * @api {post} /api/participle 解析内容并返回分词
 * @apiName participle
 * @apiGroup Content
 *
 * @apiParam {String} content 内容.
 * @apiParam {String} access_token Token.
 *
 * @apiSuccess {String} code 状态码.
 * @apiSuccess {String} message 错误信息.
 * @apiSuccess {Object} data 数据.
 * @apiSuccessExample 成功: 
 * { 
 *  code:'0000', 
 *  message:'解析成功', 
 *  data:{content:["a","b","c"]} 
 *  } 
 *  @apiErrorExample 失败: 
 *  { 
 *   code:'9999', 
 *   message:'解析失败', 
 *   data:{} 
 *   } 
 * @apiExample  链接:
 *  http://192.168.1.89:8810/api/participle
 * @apiParamExample {json} 请求示例:
 *     {
 *       "content": '123456',
 *       "access_token": '123456',
 *     }
 * @apiSampleRequest http://192.168.1.89:8810/api/participle
 */
router.post('/api/participle', function(req, res, next) {
    var content = req.body.content;
    if (!content) {
        res.send({ code: '9999', message: '内容不能为空', data: {} });
        return;
    }
    segment_utils.participle(content, function(result) {
        res.send({ code: '0000', message: '获取分词信息成功', data: { content: result } });
        return;
    });
});
module.exports = router;
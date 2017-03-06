var express = require('express'),
    router = express.Router(),
    resultMsg = require('../../orange/result/result').Result,
    util = require('../../orange/utils'),
    oauth2 = require('../../orange.middleware/oauth2'),
    smsUtil = require('../../orange/sms/top_channel'),
    segment_utils = require('../../orange/segment/segment_utils'),
    oauth_user_service = require('../../orange.service/oauth_user_service'),
    orange_sms_service = require('../../orange.service/orange_sms_service');

/**
 * @api {状态码} Code Code错误编码
 * @apiName Code错误编码
 * @apiGroup 1_Global
 * @apiSuccess {String} code--0000 调用成功.
 * @apiSuccess {String} code--9999 调用失败.
 * @apiSuccess {String} code--9998 验证Token失败.
 * @apiSuccess {String} code--9997 Token失效，请重新验证.
 * @apiSuccess {String} code--8888 非空验证.
 */

/**
 * @api {post} /api/authorize 获取Token
 * @apiName authorize
 * @apiGroup 2_OAuth
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
 *       "sign": '123456
 *     }
 * @apiSampleRequest http://192.168.1.89:8810/api/authorize
 */
router.post('/api/authorize', oauth2.access_token);

router.post('*', oauth2.authorization);

/**
 * @api {post} /api/send_sms_code 发送验证码
 * @apiName send_sms_code
 * @apiGroup 3_Message
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
 *       "access_token": '123456'
 *     }
 * @apiSampleRequest http://192.168.1.89:8810/api/send_sms_code
 */
router.post('/api/send_sms_code', function(req, res, next) {
    var phone = req.body.phone;
    if (!phone) {
        res.send(resultMsg.required('手机号不能为空'));
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
 * @apiGroup 3_Message
 *
 * @apiParam {String} phone 手机号.
 * @apiParam {String} code 验证码.
 * @apiParam {String} access_token Token.
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
 * @apiExample  链接:
 *  http://192.168.1.89:8810/api/verify_sms_code
 * @apiParamExample {json} 请求示例:
 *     {
 *       "phone": '123456',
 *       "code":'123456',
 *       "access_token": '123456'
 *     }
 * @apiSampleRequest http://192.168.1.89:8810/api/verify_sms_code
 */
router.post('/api/verify_sms_code', function(req, res, next) {
    var phone = req.body.phone,
        code = req.body.code;
    if (!phone) {
        res.send(resultMsg.required('手机号不能为空'));
        return;
    }
    if (!code) {
        res.send(resultMsg.required('短信验证码不能为空'));
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

/**
 * @api {post} /api/register_verify 注册验证
 * @apiName register_verify
 * @apiGroup 2_OAuth
 *
 * @apiParam {String} nick_name 昵称.
 * @apiParam {String} phone 手机号.
 * @apiParam {String} access_token Token.
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
 * @apiExample  链接:
 *  http://192.168.1.89:8810/api/register_verify
 * @apiParamExample {json} 请求示例:
 *     {
 *       "nick_name": '123456',
 *       "phone": '123456',
 *       "access_token": '123456'
 *     }
 * @apiSampleRequest http://192.168.1.89:8810/api/register_verify
 */
router.post('/api/register_verify', function(req, res, next) {
    var nick_name = req.body.nick_name,
        phone = req.body.phone;
    if (!nick_name) {
        res.send(resultMsg.required('昵称不能为空'));
        return;
    }
    if (!phone) {
        res.send(resultMsg.required('手机号不能为空'));
        return;
    }
    oauth_user_service.registerVerify(nick_name, phone, '', '', function(res) {
        if (res.error == true) {
            res.send(resultMsg.fail(res.message));
            return;
        } else {
            res.send(resultMsg.success(res.message));
            return;
        }
    });
});

/**
 * @api {post} /api/register 注册
 * @apiName register
 * @apiGroup 2_OAuth
 *
 * @apiParam {String} nick_name 昵称.
 * @apiParam {String} phone 手机号.
 * @apiParam {String} pwd 密码.
 * @apiParam {String} code 验证码.
 * @apiParam {String} access_token Token.
 *
 * @apiSuccess {String} code 状态码.
 * @apiSuccess {String} message 错误信息.
 * @apiSuccess {Object} data 数据.
 * @apiSuccessExample 成功: 
 * { 
 *  code:'0000', 
 *  message:'注册成功', 
 *  data:{} 
 *  } 
 *  @apiErrorExample 失败: 
 *  { 
 *   code:'9999', 
 *   message:'注册失败', 
 *   data:{} 
 *   } 
 * @apiExample  链接:
 *  http://192.168.1.89:8810/api/register
 * @apiParamExample {json} 请求示例:
 *     {
 *       "nick_name": '123456',
 *       "phone": '123456',
 *       "pwd": '123456',
 *       "code":'123456',
 *       "access_token": '123456'
 *     }
 * @apiSampleRequest http://192.168.1.89:8810/api/register
 */
router.post('/api/register', function(req, res, next) {
    var nick_name = req.body.nick_name,
        phone = req.body.phone,
        pwd = req.body.pwd,
        code = req.body.code;
    if (!nick_name) {
        res.send(resultMsg.required('昵称不能为空'));
        return;
    }
    if (!phone) {
        res.send(resultMsg.required('手机号不能为空'));
        return;
    }
    if (!pwd) {
        res.send(resultMsg.required('密码不能为空'));
        return;
    }
    if (!code) {
        res.send(resultMsg.required('短信验证码不能为空'));
        return;
    }
    oauth_user_service.register(nick_name, phone, pwd, code, function(result) {
        if (result.error == true) {
            res.send(resultMsg.fail(result.message));
            return;
        } else {
            res.send(resultMsg.success(result.message));
            return;
        }
    });
});


/**
 * @api {post} /api/participle 解析内容并返回分词
 * @apiName participle
 * @apiGroup 4_Content
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
 *       "access_token": '123456'
 *     }
 * @apiSampleRequest http://192.168.1.89:8810/api/participle
 */
router.post('/api/participle', function(req, res, next) {
    var content = req.body.content;
    if (!content) {
        res.send(resultMsg.required('内容不能为空'));
        return;
    }
    segment_utils.participle(content, function(result) {
        res.send(resultMsg.success('获取分词信息成功', { content: result }));
        return;
    });
});
module.exports = router;
var resultMsg = require('../../../orange/result/result').Result,
    oauth_user_service = require('../../../orange.service/oauth_user_service'),
    reg_verify = require('../../../orange/reg_verify');

module.exports = function(router) {

    /**
     * @api {post} /api/register_verify 注册验证
     * @apiName register_verify
     * @apiGroup API
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
     * @apiParamExample {json} 请求示例:
     *     {
     *       "nick_name": '123456',
     *       "phone": '123456',
     *       "access_token": '123456'
     *     }
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
        if (!reg_verify.verifyPhone(phone)) {
            res.send(resultMsg.required('手机号格式不正确'));
            return;
        }
        oauth_user_service.registerVerify(nick_name, phone, '', '', function(result) {
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
     * @api {post} /api/register 注册
     * @apiName register
     * @apiGroup API
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
     * @apiParamExample {json} 请求示例:
     *     {
     *       "nick_name": '123456',
     *       "phone": '123456',
     *       "pwd": '123456',
     *       "code":'123456',
     *       "access_token": '123456'
     *     }
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
        if (!reg_verify.verifyPhone(phone)) {
            res.send(resultMsg.required('手机号格式不正确'));
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
        if (!reg_verify.verifySmsCode(code)) {
            res.send(resultMsg.required('短信验证码为6位数字'));
            return;
        }
        var appid = res.app_id;
        oauth_user_service.register(nick_name, phone, pwd, code, appid, function(result) {
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
     * @api {post} /api/update_pwd 修改密码
     * @apiName update_pwd
     * @apiGroup API
     *
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
     *  message:'修改成功', 
     *  data:{} 
     *  } 
     *  @apiErrorExample 失败: 
     *  { 
     *   code:'9999', 
     *   message:'修改失败', 
     *   data:{} 
     *   } 
     * @apiParamExample {json} 请求示例:
     *     {
     *       "phone": '123456',
     *       "pwd": '123456',
     *       "code":'123456',
     *       "access_token": '123456'
     *     }
     */
    router.post('/api/update_pwd', function(req, res, next) {
        var phone = req.body.phone,
            pwd = req.body.pwd,
            code = req.body.code;
        if (!phone) {
            res.send(resultMsg.required('手机号不能为空'));
            return;
        }
        if (!reg_verify.verifyPhone(phone)) {
            res.send(resultMsg.required('手机号格式不正确'));
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
        if (!reg_verify.verifySmsCode(code)) {
            res.send(resultMsg.required('短信验证码为6位数字'));
            return;
        }
        oauth_user_service.updatePwd(phone, pwd, code, function(result) {
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
     * @api {post} /api/login 登录
     * @apiName login
     * @apiGroup API
     *
     * @apiParam {String} phone 手机号.
     * @apiParam {String} pwd 密码.
     * @apiParam {String} access_token Token.
     *
     * @apiSuccess {String} code 状态码.
     * @apiSuccess {String} message 错误信息.
     * @apiSuccess {Object} data 数据.
     * @apiSuccessExample 成功: 
     * { 
     *  code:'0000', 
     *  message:'登录成功', 
     *  data:{
     *        userid:"",
     *        phone:"",
              nick_name: "",
              avatar:""
     *       } 
     *  } 
     *  @apiErrorExample 失败: 
     *  { 
     *   code:'9999', 
     *   message:'登录失败', 
     *   data:{} 
     *   } 
     * @apiParamExample {json} 请求示例:
     *     {
     *       "phone": '123456',
     *       "pwd": '123456',
     *       "access_token": '123456'
     *     }
     */
    router.post('/api/login', function(req, res, next) {
        var phone = req.body.phone,
            pwd = req.body.pwd;
        if (!phone) {
            res.send(resultMsg.required('手机号不能为空'));
            return;
        }
        if (!reg_verify.verifyPhone(phone)) {
            res.send(resultMsg.required('手机号格式不正确'));
            return;
        }
        if (!pwd) {
            res.send(resultMsg.required('密码不能为空'));
            return;
        }
        oauth_user_service.login(phone, pwd, function(result) {
            if (result.error == true) {
                res.send(resultMsg.fail(result.message));
                return;
            } else {
                res.send(resultMsg.success(result.message, result.data));
                return;
            }
        });
    });

    /**
     * @api {post} /api/get_user_info 获取用户信息
     * @apiName get_user_info
     * @apiGroup API
     *
     * @apiParam {String} userid 用户唯一标识.
     * @apiParam {String} access_token Token.
     *
     * @apiSuccess {String} code 状态码.
     * @apiSuccess {String} message 错误信息.
     * @apiSuccess {Object} data 数据.
     * @apiSuccessExample 成功: 
     * { 
     *  code:'0000', 
     *  message:'获取成功', 
     *  data:{         
     *        phone:"",
              nick_name: "",
              avatar:"",
              signature:"",
              city:{
                  code:"",
                  name:""
                   },
              birthday:"",
              gender:{
                  code:"",
                  name:""
                   },
             } 
     *  } 
     *  @apiErrorExample 失败: 
     *  { 
     *   code:'9999', 
     *   message:'获取失败', 
     *   data:{} 
     *   } 
     * @apiParamExample {json} 请求示例:
     *     {
     *       "userid": '123456',
     *       "access_token": '123456'
     *     }
     */
    router.post('/api/get_user_info', function(req, res, next) {
        var userid = req.body.userid;
        if (!userid) {
            res.send(resultMsg.required('用户id不能为空'));
            return;
        }
        oauth_user_service.getUserInfo(userid, function(result) {
            if (result.error == true) {
                res.send(resultMsg.fail(result.message));
                return;
            } else {
                res.send(resultMsg.success(result.message, result.data));
                return;
            }
        });
    });

    /**
     * @api {post} /api/save_user_info 修改用户信息
     * @apiName save_user_info
     * @apiGroup API
     *
     * @apiParam {String} userid 用户唯一标识.
     * @apiParam {String} nick_name 昵称.
     * @apiParam {String} avatar 头像.
     * @apiParam {String} signature 签名.
     * @apiParam {String} city_code 城市编码.
     * @apiParam {String} city_name 城市名称.
     * @apiParam {String} birthday 生日.
     * @apiParam {String} gender_code 性别编码.
     * @apiParam {String} gender_name 性别名称.
     * @apiParam {String} is_hide_gender 是否隐藏性别.
     * @apiParam {String} is_hide_birthday 是否隐藏生日.
     * 
     * @apiParam {String} access_token Token.
     *
     * @apiSuccess {String} code 状态码.
     * @apiSuccess {String} message 错误信息.
     * @apiSuccess {Object} data 数据.
     * @apiSuccessExample 成功: 
     * { 
     *  code:'0000', 
     *  message:'修改成功', 
     *  data:{         
     *        phone:"",
              nick_name: "",
              avatar:"",
              signature:"",
              city:{
                  code:"",
                  name:""
                   },
              birthday:"",
              gender:{
                  code:"",
                  name:""
                   },
             }，
             is_hide_gender:''
     *  } 
     *  @apiErrorExample 失败: 
     *  { 
     *   code:'9999', 
     *   message:'修改失败', 
     *   data:{} 
     *   } 
     * @apiParamExample {json} 请求示例:
     *     {
     *       "userid": '123456',
     *       "nick_name": '123456',
     *       "avatar": '123456',
     *       "signature": '123456',
     *       "city_code": '123456',
     *       "city_name": '123456',
     *       "birthday": '123456',
     *       "gender_code": '123456',
     *       "gender_name": '123456',
     *       "access_token": '123456',
     *       "is_hide_gender":'0 显示，1 隐藏',
     *       "is_hide_birthday":'0 显示，1 隐藏',
     *     }
     */
    router.post('/api/save_user_info', function(req, res, next) {
        var userid = req.body.userid,
            nick_name = req.body.nick_name,
            avatar = req.body.avatar,
            signature = req.body.signature,
            city_code = req.body.city_code,
            city_name = req.body.city_name,
            birthday = req.body.birthday,
            gender_code = req.body.gender_code,
            gender_name = req.body.gender_name,
            is_hide_gender = req.body.is_hide_gender,
            is_hide_birthday = req.body.is_hide_birthday;
        if (!userid) {
            res.send(resultMsg.required('用户id不能为空'));
            return;
        }
        if (!nick_name) {
            res.send(resultMsg.required('昵称不能为空'));
            return;
        }
        oauth_user_service.saveUserInfo(userid, nick_name, avatar, signature, city_code, city_name, birthday, gender_code, gender_name, is_hide_gender, is_hide_birthday, function(result) {
            if (result.error == true) {
                res.send(resultMsg.fail(result.message));
                return;
            } else {
                res.send(resultMsg.success(result.message, result.data));
                return;
            }
        });
    });
}
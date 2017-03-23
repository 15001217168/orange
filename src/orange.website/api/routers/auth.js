var oauth2 = require('../../../orange.middleware/oauth2');

module.exports = function(router) {
    /**
     * @api {post} /api/authorize 获取Token
     * @apiName authorize
     * @apiGroup API
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
     * @apiParamExample {json} 请求示例:
     *     {
     *       "appid": '123456',
     *       "timespan": '123456',
     *       "noncestr": '123456',
     *       "sign": '123456
     *     }
     */
    router.post('/api/authorize', oauth2.access_token);

    router.post('*', oauth2.authorization);

};
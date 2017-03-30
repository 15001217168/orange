var resultMsg = require('../../../orange/result/result').Result,
    orange_content_service = require('../../../orange.service/orange_content_service');

module.exports = function(router) {
    router.get('/', function(req, res, next) {
        res.redirect('/apidoc/index.html');
    });
    /**
     * @api {post} /api/get_home_template 获取首页模块
     * @apiName get_home_template
     * @apiGroup API
     *
     * @apiHeader {String} access_token Token.
     *
     * @apiSuccess {String} code 状态码.
     * @apiSuccess {String} message 错误信息.
     * @apiSuccess {Object} data 数据.
     * @apiSuccessExample 成功: 
     * { 
     *  code:'0000', 
     *  message:'获取成功', 
     *  data:{} 
     *  } 
     *  @apiErrorExample 失败: 
     *  { 
     *   code:'9999', 
     *   message:'获取失败', 
     *   data:{} 
     *   } 
     * @apiParamExample {json} 请求示例:
     *     {
     *       "access_token": '123456'
     *     }
     */
    router.post('/api/get_home_template', function(req, res, next) {

    });
};
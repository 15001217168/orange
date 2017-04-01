var resultMsg = require('../../../orange/result/result').Result,
    orange_type_service = require('../../../orange.service/orange_type_service'),
    config = require('../../../config');

module.exports = function(router) {
    /**
     * @api {post} /api/get_topics 获取主题列表
     * @apiName get_topics
     * @apiGroup API
     * 
     * @apiParam {String} page_index 页码.
     * @apiParam {String} page_size 每页数量.
     * @apiParam {String} key 查询值.
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
     *       "page_index": '0',
     *       "page_size": '20',
     *       "key": '123456',
     *       "access_token": '123456'
     *     }
     */
    router.post('/api/get_topics', function(req, res, next) {
        var page_index = req.body.page_index || 1,
            page_size = req.body.page_size || config.page_size,
            key = req.body.key || "";
        orange_type_service.getTopics(page_index, page_size, key, function(result) {
            if (result.error == true) {
                res.send(resultMsg.fail(result.message));
                return;
            } else {
                res.send(resultMsg.success(result.message, { list: result.data, pagination: result.pagination }));
                return;
            }
        });
    });
}
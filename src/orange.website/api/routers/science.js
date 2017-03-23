var resultMsg = require('../../../orange/result/result').Result,
    segment_utils = require('../../../orange/segment/segment_utils');

module.exports = function(router) {

    /**
     * @api {post} /api/participle 解析内容并返回分词
     * @apiName participle
     * @apiGroup API
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
     * @apiParamExample {json} 请求示例:
     *     {
     *       "content": '123456',
     *       "access_token": '123456'
     *     }
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
};
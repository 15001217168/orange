var resultMsg = require('../../../orange/result/result').Result,
    orange_content_service = require('../../../orange.service/orange_content_service');

module.exports = function(router) {

    /**
     * @api {post} /api/save_content 保存内容
     * @apiName save_content
     * @apiGroup API
     *
     * @apiParam {String} title 标题.
     * @apiParam {String} content html内容.
     * @apiParam {String} markdown markdown内容.
     * @apiParam {String} userid 用户id.
     * @apiParam {String} typeid 分类id.
     * @apiParam {String} access_token Token.
     *
     * @apiSuccess {String} code 状态码.
     * @apiSuccess {String} message 错误信息.
     * @apiSuccess {Object} data 数据.
     * @apiSuccessExample 成功: 
     * { 
     *  code:'0000', 
     *  message:'保存成功', 
     *  data:{} 
     *  } 
     *  @apiErrorExample 失败: 
     *  { 
     *   code:'9999', 
     *   message:'保存失败', 
     *   data:{} 
     *   } 
     * @apiParamExample {json} 请求示例:
     *     {
     *       "title": '123456',
     *       "content": '123456',
     *       "markdown": '123456',
     *       "userid": '123456',
     *       "typeid": '123456',
     *       "access_token": '123456'
     *     }
     */
    router.post('/api/save_content', function(req, res, next) {
        var contentid = req.body.contentid,
            title = req.body.title,
            content = req.body.content,
            markdown = req.body.markdown,
            userid = req.body.userid,
            typeid = req.body.typeid;
        if (!title) {
            res.send(resultMsg.required('标题不能为空'));
            return;
        }
        if (!content) {
            res.send(resultMsg.required('内容不能为空'));
            return;
        }
        orange_content_service.saveContent(contentid, title, content, markdown, userid, typeid, function(result) {
            if (result.error == true) {
                res.send(resultMsg.fail(result.message));
                return;
            } else {
                res.send(resultMsg.success(result.message));
                return;
            }
        });
    });
}
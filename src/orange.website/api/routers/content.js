var resultMsg = require('../../../orange/result/result').Result,
    orange_content_service = require('../../../orange.service/orange_content_service'),
    config = require('../../../config');

module.exports = function(router) {
    /**
     * @api {post} /api/get_user_contents 获取用户写作内容列表
     * @apiName get_user_contents
     * @apiGroup API
     * 
     * @apiParam {String} page_index 页码.
     * @apiParam {String} page_size 每页数量.
     * @apiParam {String} key 查询值.
     * @apiParam {String} type_id 分类id.
     * 
     * @apiHeader {String} access_token Token.
     * @apiHeader {String} user_token 用户Token.
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
     *       "type_id": '123456',
     *       "user_token": '123456',
     *       "access_token": '123456'
     *     }
     */
    router.post('/api/get_user_contents', function(req, res, next) {
        var page_index = req.body.page_index || 1,
            page_size = req.body.page_size || config.page_size,
            key = req.body.key || "",
            type_id = req.body.type_id || "",
            user_token = req.headers.user_token;
        if (!user_token) {
            res.send(resultMsg.required('用户Token不能为空'));
            return;
        }
        orange_content_service.getUserContentList(user_token, page_index, page_size, key, type_id, function(result) {
            if (result.error == true) {
                res.send(resultMsg.fail(result.message));
                return;
            } else {
                res.send(resultMsg.success(result.message, { list: result.data, pagination: result.pagination }));
                return;
            }
        });
    });

    /**
     * @api {post} /api/get_user_content_detail 获取用户写作内容详情
     * @apiName get_user_content_detail
     * @apiGroup API
     * 
     * @apiParam {String} content_id 内容Id.
     * 
     * @apiHeader {String} access_token Token.
     * @apiHeader {String} user_token 用户Token.
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
     *       "content_id": '123456',
     *       "user_token": '123456',
     *       "access_token": '123456'
     *     }
     */
    router.post('/api/get_user_content_detail', function(req, res, next) {
        var content_id = req.body.content_id,
            user_token = req.headers.user_token;
        if (!content_id) {
            res.send(resultMsg.required('内容Id不能为空'));
            return;
        }
        if (!user_token) {
            res.send(resultMsg.required('用户Token不能为空'));
            return;
        }
        orange_content_service.getUserContentDetailById(user_token, content_id, function(result) {
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
     * @api {post} /api/save_content 保存内容
     * @apiName save_content
     * @apiGroup API
     * 
     * @apiParam {String} content_id 文章id.
     * @apiParam {String} title 标题.
     * @apiParam {String} content html内容.
     * @apiParam {String} markdown markdown内容.
     * @apiParam {String} type_id 分类id.
     * 
     * @apiHeader {String} access_token Token.
     * @apiHeader {String} user_token 用户Token.
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
     *       "user_token": '123456',
     *       "type_id": '123456',
     *       "access_token": '123456'
     *     }
     */
    router.post('/api/save_content', function(req, res, next) {
        var contentid = req.body.content_id,
            title = req.body.title,
            content = req.body.content,
            markdown = req.body.markdown,
            user_token = req.headers.user_token,
            typeid = req.body.type_id;
        if (!user_token) {
            res.send(resultMsg.required('用户Token不能为空'));
            return;
        }
        if (!title) {
            res.send(resultMsg.required('标题不能为空'));
            return;
        }
        if (!content) {
            res.send(resultMsg.required('内容不能为空'));
            return;
        }
        orange_content_service.saveContent(contentid, title, content, markdown, user_token, typeid, function(result) {
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
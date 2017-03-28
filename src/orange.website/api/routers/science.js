var resultMsg = require('../../../orange/result/result').Result,
    segment_utils = require('../../../orange/segment/segment_utils'),
    provinces = require('../json/provinces'),
    cities = require('../json/cities');

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

    /**
     * @api {post} /api/get_provinces 获取省份
     * @apiName get_provinces
     * @apiGroup API
     *
     * @apiParam {String} access_token Token.
     *
     * @apiSuccess {String} code 状态码.
     * @apiSuccess {String} message 错误信息.
     * @apiSuccess {Object} data 数据.
     * @apiSuccessExample 成功: 
     * { 
     *  code:'0000', 
     *  message:'获取成功', 
     *  data:[{code:"",name:""}]
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
    router.post('/api/get_provinces', function(req, res, next) {
        res.send(resultMsg.success('获取省份成功', provinces.provinces));
        return;
    });

    /**
     * @api {post} /api/get_cites 获取城市
     * @apiName get_cites
     * @apiGroup API
     *
     * @apiParam {String} access_token Token.
     *
     * @apiSuccess {String} code 状态码.
     * @apiSuccess {String} message 错误信息.
     * @apiSuccess {Object} data 数据.
     * @apiSuccessExample 成功: 
     * { 
     *  code:'0000', 
     *  message:'获取成功', 
     *  data:[{code:"",name:""}]
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
    router.post('/api/get_cites', function(req, res, next) {
        res.send(resultMsg.success('获取城市', cities.cities));
        return;
    });

    /**
     * @api {post} /api/get_cites_by_province 获取城市通过省份
     * @apiName get_cites_by_province
     * @apiGroup API
     * @apiParam {String} province_code 省份编码.
     * @apiParam {String} access_token Token.
     *
     * @apiSuccess {String} code 状态码.
     * @apiSuccess {String} message 错误信息.
     * @apiSuccess {Object} data 数据.
     * @apiSuccessExample 成功: 
     * { 
     *  code:'0000', 
     *  message:'获取成功', 
     *  data:[{code:"",name:""}]
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
    router.post('/api/get_cites_by_province', function(req, res, next) {
        var province_code = req.body.province_code;
        if (!province_code) {
            res.send(resultMsg.required('省份不能为空'));
            return;
        }
        var arr = cities.cities,
            item = null,
            result = [];
        for (var i in arr) {
            var item = arr[i];
            if (item.parent_code == province_code) {
                result.push(item);
            }
        }
        res.send(resultMsg.success('获取城市成功', result));
        return;
    });
};
var resultMsg = require('../../../orange/result/result').Result,
    utils = require('../../../orange/utils'),
    multiparty = require('multiparty'),
    fs = require('fs'),
    config = require('../../../config'),
    path = require('path');

module.exports = function(router) {
    /**
     * @api {post} /api/upload_img 上传图片
     * @apiName upload_img
     * @apiGroup API
     *
     * @apiHeader {String} user_id 用户Id.
     * @apiHeader {String} access_token Token.
     *
     * @apiSuccess {String} code 状态码.
     * @apiSuccess {String} message 错误信息.
     * @apiSuccess {Object} data 数据.
     * @apiSuccessExample 成功: 
     * { 
     *  code:'0000', 
     *  message:'上传成功', 
     *  data:{
     *        url:"afaf"
     *       } 
     *  } 
     *  @apiErrorExample 失败: 
     *  { 
     *   code:'9999', 
     *   message:'上传失败', 
     *   data:{} 
     *   } 
     * @apiParamExample {json} 请求示例:
     *     {
     *       "user_id": '123456',
     *       "access_token": '123456'
     *     }
     */
    router.post('/api/upload_img', function(req, res, next) {
        var userid = req.headers.user_id;
        if (!userid) {
            res.send(resultMsg.required('用户Id不能为空'));
            return;
        };
        var pathImg = config.upload_path + userid + '\\';
        fs.exists(pathImg, function(exist) {
            if (!exist) {
                fs.mkdir(pathImg);
            }
        });
        //生成multiparty对象，并配置上传目标路径
        var form = new multiparty.Form({ uploadDir: pathImg });
        //上传完成后处理
        form.parse(req, function(err, fields, files) {
            if (err) {
                res.send(resultMsg.fail('上传图片失败！'));
                return;
            } else {
                if (files) {
                    var file = null;
                    for (var i in files) { //用javascript的for/in循环遍历对象的属性 
                        file = files[i];
                    }
                    if (file && file.length > 0) {
                        var uploadedPath = path.basename(file[0].path);
                        res.send(resultMsg.success('上传图片成功！', { url: config.img_url + '/upload/' + userid + '/' + uploadedPath }));
                        return;
                    } else {
                        res.send(resultMsg.required('未接收到图片流'));
                        return;
                    }
                } else {
                    res.send(resultMsg.required('未接收到图片流'));
                    return;
                }
            }
        });
    });
};
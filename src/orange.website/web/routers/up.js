var bizResult = require('../../../orange/result/result').BizResult,
    utils = require('../../../orange/utils'),
    multiparty = require('multiparty'),
    fs = require('fs'),
    config = require('../../../config');

module.exports = function(router) {
    router.post('/editor.md/upload', function(req, res, next) {
        //生成multiparty对象，并配置上传目标路径
        var form = new multiparty.Form({ uploadDir: config.upload_path });
        //上传完成后处理
        form.parse(req, function(err, fields, files) {
            if (err) {
                res.send(bizResult.error('上传图片失败！'));
                return;
            } else {
                var file = files["imgUpload"][0];
                var uploadedPath = file.path.replace(config.upload_path, '');
                res.send(bizResult.success('上传图片成功！', { url: config.img_url + '/upload/' + uploadedPath }));
                return;
            }
        });
    });
};
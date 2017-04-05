var config = require('../../../config'),
    crypto = require('crypto'),
    multiparty = require('multiparty'),
    fs = require('fs'),
    path = require('path');
module.exports = function(router) {

    router.post('/upload', function(req, res, next) {
        //生成multiparty对象，并配置上传目标路径
        var pathImg = config.upload_path + req.user.username;
        fs.exists(pathImg, function(exist) {
            if (!exist) {
                fs.mkdir(pathImg);
            }
            var form = new multiparty.Form({ uploadDir: pathImg });
            //上传完成后处理
            form.parse(req, function(err, fields, files) {
                var result = {
                    error: true,
                    message: '上传图片失败！',
                    data: {}
                };
                if (err) {
                    result.message = err.message;
                } else {
                    var file = files.imgFile[0];
                    var uploadedPath = path.basename(file.path);

                    result.error = false;
                    result.message = '上传图片成功！';
                    result.data = { url: config.img_url + 'upload/' + req.user.username + '/' + uploadedPath };
                }
                res.send(result);
                return;
            });
        });
    });

};
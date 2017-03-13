var express = require('express'),
    router = express.Router(),
    config = require('../../config'),
    crypto = require('crypto'),
    multiparty = require('multiparty'),
    fs = require('fs'),
    sysUserService = require('../../orange.service/sys_user_service'),
    oauthClientService = require('../../orange.service/oauth_client_service'),
    orangeTypeService = require('../../orange.service/orange_type_service'),
    orangeContentService = require('../../orange.service/orange_content_service'),
    http = require('http');

//首页
router.get('/', function(req, res, next) {
    res.redirect('index.html');
});
//注册
router.post('/reg', function(req, res, next) {});

router.post('/editor.md/upload', function(req, res, next) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({ uploadDir: config.upload_path });
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        var result = {
            success: 0,
            message: '上传图片失败！',
            url: ""
        };
        if (err) {
            result.message = err.message;
        } else {
            var file = files["editormd-image-file"][0];
            var uploadedPath = file.path.replace(config.upload_path, '');
            result.success = 1;
            result.message = '上传图片成功！';
            result.url = config.img_url + '/upload/' + uploadedPath;
        }
        res.send(result);
        return;
    });
});

module.exports = router;
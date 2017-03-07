var express = require('express'),
    router = express.Router(),
    config = require('../../config'),
    crypto = require('crypto'),
    sysUserService = require('../../orange.service/sys_user_service'),
    oauthClientService = require('../../orange.service/oauth_client_service'),
    orangeTypeService = require('../../orange.service/orange_type_service'),
    orangeContentService = require('../../orange.service/orange_content_service');

//首页
router.get('/', function(req, res, next) {
    res.redirect('index.html');
});
module.exports = router;
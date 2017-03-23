var express = require('express'),
    router = express.Router();
//验证
require('./routers/common')(router);
//首页
require('./routers/home')(router);
//注册
require('./routers/reg')(router);
//验证码
require('./routers/sms')(router);
//登录
require('./routers/login')(router);
//写作
require('./routers/writer')(router);
//内容
require('./routers/content')(router);

module.exports = router;
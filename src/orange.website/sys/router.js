var express = require('express'),
    router = express.Router();
//首页
require('./routers/home')(router);
//登录
require('./routers/login')(router);
//注册
require('./routers/reg')(router);
//app
require('./routers/app')(router);
//用户
require('./routers/user')(router);
//类型
require('./routers/type')(router);
//模板
require('./routers/template')(router);
//内容
require('./routers/content')(router);
//上传
require('./routers/up')(router);

module.exports = router;
var express = require('express'),
    router = express.Router();
//验证
require("./routers/auth")(router);
//首页
require("./routers/home")(router);
//验证码
require("./routers/sms")(router);
//用户
require("./routers/user")(router);
//内容
require("./routers/content")(router);
//主题
require("./routers/topic")(router);
//科学
require("./routers/science")(router);
//上传
require("./routers/up")(router);

module.exports = router;
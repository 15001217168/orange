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
//科学
require("./routers/science")(router);

module.exports = router;
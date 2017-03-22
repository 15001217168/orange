define({ "api": [
  {
    "type": "post",
    "url": "/api/authorize",
    "title": "获取Token",
    "name": "authorize",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appid",
            "description": "<p>客户端Appid.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "timespan",
            "description": "<p>时间戳.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "noncestr",
            "description": "<p>随机字符串.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sign",
            "description": "<p>签名.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n  \"appid\": '123456',\n  \"timespan\": '123456',\n  \"noncestr\": '123456',\n  \"sign\": '123456\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功: ",
          "content": "{ \n code:'0000', \n message:'验证客户端成功', \n data:{  access_token: 'access_token' } \n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败: ",
          "content": "{ \n code:'9999', \n message:'操作失败', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "API",
    "sampleRequest": [
      {
        "url": "http://api.ohlion.com/api/authorize"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/get_home_template",
    "title": "获取首页模块",
    "name": "get_home_template",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n  \"access_token\": '123456'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功: ",
          "content": "{ \n code:'0000', \n message:'获取成功', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败: ",
          "content": "{ \n code:'9999', \n message:'获取失败', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "API",
    "sampleRequest": [
      {
        "url": "http://api.ohlion.com/api/get_home_template"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/get_user_info",
    "title": "获取用户信息",
    "name": "get_user_info",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userid",
            "description": "<p>用户唯一标识.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n  \"userid\": '123456',\n  \"access_token\": '123456'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功: ",
          "content": "{ \n code:'0000', \n message:'获取成功', \n data:{         \n       phone:\"\",\n          nick_name: \"\",\n          avatar:\"\",\n          signature:\"\",\n          city:{\n              code:\"\",\n              name:\"\"\n               },\n          birthday:\"\",\n          gender:{\n              code:\"\",\n              name:\"\"\n               },\n         } \n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败: ",
          "content": "{ \n code:'9999', \n message:'获取失败', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "API",
    "sampleRequest": [
      {
        "url": "http://api.ohlion.com/api/get_user_info"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "登录",
    "name": "login",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pwd",
            "description": "<p>密码.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n  \"phone\": '123456',\n  \"pwd\": '123456',\n  \"access_token\": '123456'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功: ",
          "content": "{ \n code:'0000', \n message:'登录成功', \n data:{\n       userid:\"\",\n       phone:\"\",\n          nick_name: \"\",\n          avatar:\"\"\n      } \n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败: ",
          "content": "{ \n code:'9999', \n message:'登录失败', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "API",
    "sampleRequest": [
      {
        "url": "http://api.ohlion.com/api/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/participle",
    "title": "解析内容并返回分词",
    "name": "participle",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>内容.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n  \"content\": '123456',\n  \"access_token\": '123456'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功: ",
          "content": "{ \n code:'0000', \n message:'解析成功', \n data:{content:[\"a\",\"b\",\"c\"]} \n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败: ",
          "content": "{ \n code:'9999', \n message:'解析失败', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "API",
    "sampleRequest": [
      {
        "url": "http://api.ohlion.com/api/participle"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "注册",
    "name": "register",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nick_name",
            "description": "<p>昵称.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pwd",
            "description": "<p>密码.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>验证码.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n  \"nick_name\": '123456',\n  \"phone\": '123456',\n  \"pwd\": '123456',\n  \"code\":'123456',\n  \"access_token\": '123456'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功: ",
          "content": "{ \n code:'0000', \n message:'注册成功', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败: ",
          "content": "{ \n code:'9999', \n message:'注册失败', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "API",
    "sampleRequest": [
      {
        "url": "http://api.ohlion.com/api/register"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/register_verify",
    "title": "注册验证",
    "name": "register_verify",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nick_name",
            "description": "<p>昵称.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n  \"nick_name\": '123456',\n  \"phone\": '123456',\n  \"access_token\": '123456'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功: ",
          "content": "{ \n code:'0000', \n message:'验证成功', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败: ",
          "content": "{ \n code:'9999', \n message:'验证失败', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "API",
    "sampleRequest": [
      {
        "url": "http://api.ohlion.com/api/register_verify"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/save_content",
    "title": "保存内容",
    "name": "save_content",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>标题.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>html内容.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "markdown",
            "description": "<p>markdown内容.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userid",
            "description": "<p>用户id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "typeid",
            "description": "<p>分类id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n  \"title\": '123456',\n  \"content\": '123456',\n  \"markdown\": '123456',\n  \"userid\": '123456',\n  \"typeid\": '123456',\n  \"access_token\": '123456'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功: ",
          "content": "{ \n code:'0000', \n message:'保存成功', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败: ",
          "content": "{ \n code:'9999', \n message:'保存失败', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "API",
    "sampleRequest": [
      {
        "url": "http://api.ohlion.com/api/save_content"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/save_user_info",
    "title": "修改用户信息",
    "name": "save_user_info",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userid",
            "description": "<p>用户唯一标识.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nick_name",
            "description": "<p>昵称.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>头像.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "signature",
            "description": "<p>签名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city_code",
            "description": "<p>城市编码.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city_name",
            "description": "<p>城市名称.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>生日.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender_code",
            "description": "<p>性别编码.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender_name",
            "description": "<p>性别名称.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n  \"userid\": '123456',\n  \"nick_name\": '123456',\n  \"avatar\": '123456',\n  \"signature\": '123456',\n  \"city_code\": '123456',\n  \"city_name\": '123456',\n  \"birthday\": '123456',\n  \"gender_code\": '123456',\n  \"gender_name\": '123456',\n  \"access_token\": '123456',\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功: ",
          "content": "{ \n code:'0000', \n message:'修改成功', \n data:{         \n       phone:\"\",\n          nick_name: \"\",\n          avatar:\"\",\n          signature:\"\",\n          city:{\n              code:\"\",\n              name:\"\"\n               },\n          birthday:\"\",\n          gender:{\n              code:\"\",\n              name:\"\"\n               },\n         }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败: ",
          "content": "{ \n code:'9999', \n message:'修改失败', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "API",
    "sampleRequest": [
      {
        "url": "http://api.ohlion.com/api/save_user_info"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/send_sms_code",
    "title": "发送验证码",
    "name": "send_sms_code",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n  \"phone\": '123456',\n  \"access_token\": '123456'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功: ",
          "content": "{ \n code:'0000', \n message:'发送验证码成功', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败: ",
          "content": "{ \n code:'9999', \n message:'发送验证码失败', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "API",
    "sampleRequest": [
      {
        "url": "http://api.ohlion.com/api/send_sms_code"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/update_pwd",
    "title": "修改密码",
    "name": "update_pwd",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pwd",
            "description": "<p>密码.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>验证码.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n  \"phone\": '123456',\n  \"pwd\": '123456',\n  \"code\":'123456',\n  \"access_token\": '123456'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功: ",
          "content": "{ \n code:'0000', \n message:'修改成功', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败: ",
          "content": "{ \n code:'9999', \n message:'修改失败', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "API",
    "sampleRequest": [
      {
        "url": "http://api.ohlion.com/api/update_pwd"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/verify_sms_code",
    "title": "验证码验证",
    "name": "verify_sms_code",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>验证码.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>Token.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n  \"phone\": '123456',\n  \"code\":'123456',\n  \"access_token\": '123456'\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>错误信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功: ",
          "content": "{ \n code:'0000', \n message:'验证成功', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "失败: ",
          "content": "{ \n code:'9999', \n message:'验证失败', \n data:{} \n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "API",
    "sampleRequest": [
      {
        "url": "http://api.ohlion.com/api/verify_sms_code"
      }
    ]
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "api/public/apidoc/main.js",
    "group": "D__My_orange_src_orange_website_api_public_apidoc_main_js",
    "groupTitle": "D__My_orange_src_orange_website_api_public_apidoc_main_js",
    "name": ""
  },
  {
    "type": "G",
    "url": "全局信息",
    "title": "",
    "name": "____",
    "group": "Global",
    "examples": [
      {
        "title": "接口地址:",
        "content": "http://api.ohlion.com/",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code--0000",
            "description": "<p>调用成功.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code--9999",
            "description": "<p>调用失败.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code--9998",
            "description": "<p>验证Token失败.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code--9997",
            "description": "<p>Token失效，请重新验证.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code--8888",
            "description": "<p>非空验证.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "Global"
  }
] });

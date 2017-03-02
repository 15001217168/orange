define({ "api": [
  {
    "type": "post",
    "url": "/api/participle",
    "title": "解析内容并返回分词",
    "name": "participle",
    "group": "Content",
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
          "content": "{\n  \"content\": '123456',\n  \"access_token\": '123456',\n}",
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
    "examples": [
      {
        "title": "链接:",
        "content": "http://192.168.1.89:8810/api/participle",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://192.168.1.89:8810/api/participle"
      }
    ],
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "Content"
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
    "type": "post",
    "url": "/api/send_sms_code",
    "title": "发送验证码",
    "name": "send_sms_code",
    "group": "Message",
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
          "content": "{\n  \"phone\": '123456',\n  \"access_token\": '123456',\n}",
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
    "examples": [
      {
        "title": "链接:",
        "content": "http://192.168.1.89:8810/api/send_sms_code",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://192.168.1.89:8810/api/send_sms_code"
      }
    ],
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "Message"
  },
  {
    "type": "post",
    "url": "/api/authorize",
    "title": "获取Token",
    "name": "authorize",
    "group": "OAuth",
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
          "content": "{\n  \"appid\": '123456',\n  \"timespan\": '123456',\n  \"noncestr\": '123456',\n  \"sign\": '123456'\n}",
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
    "examples": [
      {
        "title": "链接:",
        "content": "http://192.168.1.89:8810/api/authorize",
        "type": "json"
      }
    ],
    "sampleRequest": [
      {
        "url": "http://192.168.1.89:8810/api/authorize"
      }
    ],
    "version": "0.0.0",
    "filename": "api/router.js",
    "groupTitle": "OAuth"
  }
] });

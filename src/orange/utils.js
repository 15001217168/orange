var http = require('http'),
    querystring = require('querystring'),
    bizResult = require('./result/result').BizResult,
    crypto = require('crypto');
//生成唯一标识码
exports.createUniqueId = function(len) {
    var buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length;
    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }
    return buf.join('');
};
exports.createRandomNumber = function(len) {
    var buf = [],
        chars = '0123456789',
        charlen = chars.length;
    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }
    return buf.join('');
};
exports.httpPost = function(path, data, callback) {
    if (!global.web_config.access_token) {
        _getToken(function() {
            _httPost(path, data, callback);
        });
    } else {
        _httPost(path, data, callback);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
var _httPost = function(path, data, callback) {
    var postData = querystring.stringify(data);
    var options = {
        hostname: global.web_config.api_url,
        port: global.web_config.api_port,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Content-Length': postData.length,
            'access_token': global.web_config.access_token
        }
    };
    var req = http.request(options, function(res) {
        var buffers = [];
        res.on('data', function(chunk) {
            buffers.push(chunk);
        });
        res.on('end', function(chunk) {
            var wholeData = Buffer.concat(buffers);
            var dataStr = wholeData.toString('utf8');
            var result = bizResult.error('系统内部错误');
            try {
                result = bizResult.success('请求成功', JSON.parse(dataStr));
            } catch (e) {

            }
            if (result.error) {
                callback(result);
            } else {
                //token失效
                if (result.data.code == "9997") {
                    _getToken(function() {
                        _httPost(path, data, callback);
                    });
                } else {
                    callback(result);
                }
            }
        });
    });
    req.on('error', function(e) {
        var result = bizResult.success('系统内部错误');
        callback(result);
    });
    // write data to request body
    req.write(postData);
    req.end();
};
var _getToken = function(callback) {
    var appid = global.web_config.app_id,
        app_secret = global.web_config.app_secret,
        noncestr = exports.createUniqueId(16),
        timespan = new Date().getTime();

    var str = appid + timespan + app_secret + noncestr;
    var sha256 = crypto.createHash("sha256");
    sha256.update(str);
    var sign = sha256.digest('hex').toUpperCase();

    _httPost('/api/authorize', {
        appid: appid,
        timespan: timespan,
        noncestr: noncestr,
        sign: sign,
    }, function(res) {
        if (res.error) {
            //请求失败
        } else {
            if (res.data.code == '0000') {
                var access_token = res.data.data.access_token;
                global.web_config.access_token = access_token;
                callback();
            } else {

            }
        }
    });
};
var http = require('http'),
    querystring = require('querystring'),
    bizResult = require('./result/result').BizResult;
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.httpPost = function(path, data, callback) {
    var postData = querystring.stringify(data);
    var options = {
        hostname: global.web_config.api_url,
        port: global.web_config.api_port,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Content-Length': postData.length
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
            callback(result);
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
var http = require("http");
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
exports.httpPost = function(path, data, success, error) {
    var postData = JSON.stringify(data);
    var options = {
        hostname: global.web_config.api_url,
        port: 80,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
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
            success(JSON.parse(dataStr));
        });
    });
    req.on('error', function(e) {
        error(e);
    });
    // write data to request body
    req.write(postData);
    req.end();
};
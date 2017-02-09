var config = require('../config'),
    crypto = require('crypto'),
    unAuthUrl = ['/login', '/reg'];
var auth = {
    permission: function (req, res, next) {
        var url = req.baseUrl;
        if (auth.isUnAuth(url)) {
            next();
            return "";
        }
        else {
            if (req.cookies["orange_a"]) {
                var account = req.cookies["orange_a"];
                var dcipher = crypto.createDecipher("aes192", config.crypto_key);
                var dciphered = dcipher.update(account, 'hex', 'utf8');
                dciphered += dcipher.final('utf8');
                req.user = JSON.parse(dciphered);
                next();
                return;
            }
            else {
                res.render('login/index');
            }
        }
    },
    isUnAuth: function (url) {
        for (var i in unAuthUrl) {
            if (unAuthUrl[i] == url) {
                return true;
            }
        }
        return false;
    }
};
module.exports = auth;
var crypto = require('crypto'),
    unAuthUrl = ['/login.html', '/reg.html', '/', '/index.html'];
var auth = {
    permission: function(req, res, next) {
        var url = req.baseUrl;
        if (auth.isUnAuth(url)) {
            next();
            return "";
        } else {
            if (req.cookies["orange_w"]) {
                var account = req.cookies["orange_w"];
                var dcipher = crypto.createDecipher("aes192", global.web_config.aes_key);
                var dciphered = dcipher.update(account, 'hex', 'utf8');
                dciphered += dcipher.final('utf8');
                req.user = JSON.parse(dciphered);
                next();
                return;
            } else {
                res.redirect('/login.html');
                2
            }
        }
    },
    isUnAuth: function(url) {
        for (var i in unAuthUrl) {
            if (unAuthUrl[i] == url) {
                return true;
            }
        }
        return false;
    }
};
module.exports = auth;
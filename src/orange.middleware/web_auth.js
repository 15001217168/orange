var crypto = require('crypto'),
    redirectLoginUrl = ['/writer'];
var auth = {
    permission: function(req, res, next) {
        if (req.cookies["orange_w"]) {
            var account = req.cookies["orange_w"];
            var dcipher = crypto.createDecipher("aes192", global.web_config.aes_key);
            var dciphered = dcipher.update(account, 'hex', 'utf8');
            dciphered += dcipher.final('utf8');
            req.user = JSON.parse(dciphered);
            if (!req.user.avatar) {
                req.user.avatar = global.web_config.default_avatar;
            }
            next();
            return;
        } else {
            var url = req.baseUrl;
            if (auth.isRedirectLoginUrl(url)) {
                res.redirect('/login');
                return;
            } else {
                req.user = "";
                next();
                return;
            }
        }
    },
    isRedirectLoginUrl: function(url) {
        for (var i in redirectLoginUrl) {
            if (redirectLoginUrl[i] == url) {
                return true;
            }
        }
        return false;
    }
};
module.exports = auth;
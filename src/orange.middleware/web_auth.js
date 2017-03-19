var crypto = require('crypto'),
    authUrl = ['writer.html'];
var auth = {
    permission: function(req, res, next) {
        var url = req.baseUrl;
        if (auth.isAuth(url)) {
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
                return;
            }
        } else {
            next();
            return;
        }
    },
    isAuth: function(url) {
        for (var i in authUrl) {
            if (authUrl[i] == url) {
                return true;
            }
        }
        return false;
    }
};
module.exports = auth;
exports.verifyPhone = function(str) {
    var res = true;
    var reg = /^1[3|4|5|7|8][0-9]\d{8}$|^\d{8}$/;
    if (!reg.test(str)) {
        res = false;
    }
    return res;
};
exports.verifySmsCode = function(str) {
    var res = true;
    var reg = /^\d{6}$/;
    if (!reg.test(str)) {
        res = false;
    }
    return res;
};
exports.verifyPwd = function(str) {
    var res = true;
    var reg = /^[A-Za-z0-9]{6,16}$/;
    if (!reg.test(str)) {
        res = false;
    }
    return res;
};
require('../../css/web.css');
require('../../css/entry.css');
require('../../css/sign.css');
$(function() {
    var Login = function() {
        this.phone = '';
        this.pwd = '';
        var _self = this;
        var setValue = function() {
            _self.phone = $('#txt_phone').val();
            _self.pwd = $('#txt_pwd').val();
        };
        var verify = function() {
            setValue();
            if (_self.phone.length == 0) {
                alert('手机号不能为空');
                return false;
            }
            var reg = /^1[3|4|5|7|8][0-9]\d{8}$|^\d{8}$/;
            if (!reg.test(_self.phone)) {
                alert('手机号格式不正确');
                return false;
            }
            if (_self.pwd.length == 0) {
                alert('密码不能为空');
                return false;
            }
            return true;
        };
        this.login = function() {
            if (verify()) {
                var _self = this;
                $.post('/login', {
                    phone: _self.phone,
                    pwd: _self.pwd
                }, function(result) {
                    if (result.error) {
                        alert(result.message);
                    } else {
                        alert(result.message);
                        window.location.href = '/';
                    }
                });
            }
        };
        this.init = function() {
            var _self = this;
            $('#btnLogin').off().on('click', function() {
                _self.login();
            });
        };
    };
    new Login().init();
});
import '../../css/entry.css';
import '../../css/sign.css';
$(function() {
    var Register = function() {
        this.nick_name = '';
        this.phone = '';
        this.sms_code = '';
        this.pwd = '';
        var _self = this;
        var setValue = function() {
            _self.nick_name = $('#txt_nick_name').val();
            _self.phone = $('#txt_phone').val();
            _self.sms_code = $('#txt_sms_code').val();
            _self.pwd = $('#txt_pwd').val();
        };
        var verify = function() {
            setValue();
            if (_self.nick_name.length == 0) {
                alert('昵称不能为空');
                return false;
            }
            if (_self.phone.length == 0) {
                alert('手机号不能为空');
                return false;
            }
            var reg = /^1[3|4|5|7|8][0-9]\d{8}$|^\d{8}$/;
            if (!reg.test(_self.phone)) {
                alert('手机号格式不正确');
                return false;
            }
            if (_self.sms_code.length == 0) {
                alert('短信验证码不能为空');
                return false;
            }
            reg = /^\d{6}$/;
            if (!reg.test(_self.sms_code)) {
                alert('短信验证码为6位数字');
                return false;
            }
            if (_self.pwd.length == 0) {
                alert('密码不能为空');
                return false;
            }
            reg = /^[A-Za-z0-9]{6,16}$/;
            if (!reg.test(_self.pwd)) {
                alert('密码为6-16位的字母数字组合');
                return false;
            }
            return true;
        };
        this.sendSms = function() {
            setValue();
            var _self = this;
            if (_self.phone.length == 0) {
                alert('手机号不能为空');
                return false;
            }
            var reg = /^1[3|4|5|7|8][0-9]\d{8}$|^\d{8}$/;
            if (!reg.test(_self.phone)) {
                alert('手机号格式不正确');
                return false;
            }
            $.post('/send_sms', {
                phone: _self.phone,
            }, function(result) {
                if (result.error) {
                    alert(result.message);
                } else {
                    var countdown = 60;
                    var timer = window.setInterval(function() {
                        countdown--;
                        $('#btnSendSms').off().attr('class', 'btn-up-sended').html(countdown)
                        if (countdown == 0) {
                            window.clearInterval(timer);
                            $('#btnSendSms').attr('class', 'btn-up-resend').html('发送验证码').off().on(function() {
                                _self.sendSms();
                            });
                        }
                    }, 1000);
                }
            });
        };
        this.reg = function() {
            if (verify()) {
                var _self = this;
                $.post('/reg', {
                    nick_name: _self.nick_name,
                    phone: _self.phone,
                    sms_code: _self.sms_code,
                    pwd: _self.pwd
                }, function(result) {
                    if (result.error) {
                        alert(result.message);
                    } else {
                        alert(result.message);
                    }
                });
            }
        };
        this.init = function() {
            var _self = this;
            $('#btnRegister').off().on('click', function() {
                _self.reg();
            });
            $('#btnSendSms').off().on('click', function() {
                _self.sendSms();
            });
        };
    };
    new Register().init();
});
var config = {
    db: {
        url: 'mongodb://orange:123456@127.0.0.1:8090/orange',
        host: '127.0.0.1',
        port: '8090',
        db: 'orange',
        username: 'orange',
        password: '123456'
    },
    upload_path: 'D:\\My\\orange_img\\upload\\',
    default_img: '',
    img_url: 'http://127.0.0.1:8840/',
    token_expire: 7200000000, //token过期时效，单位秒
    verification_code_expire: 1800, //验证码过期时效，单位秒
    page_size: 20,
    crypto_key: "orange123456",
    cookie_expire: 6 * 60 * 60 * 1000
};
module.exports = config;
var config = {
    db: {
        url: 'mongodb://orange:123456@120.76.176.44:8090/orange',
        host: '127.0.0.1',
        port: '8090',
        db: 'orange',
        username: 'orange',
        password: '123456'
    },
    upload_path: 'D:\\My\\orange_img\\upload\\',
    default_img: '',
    img_url: 'http://127.0.0.1:8840/',
    token_expire: 7200, //token过期时效，单位小时
    user_token_expire: 2, //user_token过期时效，单位小时
    verification_code_expire: 1800, //验证码过期时效，单位秒
    cookie_expire: 2 * 60 * 60 * 1000,
    page_size: 20,
    crypto_key: "orange123456",

};
module.exports = config;
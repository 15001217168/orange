var config = {
    db: {
        url: 'mongodb://orange:123456@127.0.0.1:8090/orange',
        host: '127.0.0.1',
        port: '8090',
        db: 'orange',
        username: 'orange',
        password: '123456'
    },
    expire:7200//token过期时效，单位秒
};
module.exports = config;
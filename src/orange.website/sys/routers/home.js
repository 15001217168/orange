module.exports = function(router) {
    router.get('/', function(req, res, next) {
        res.render('home/index', {
            title: "首页",
            username: "admin"
        });
    });
};
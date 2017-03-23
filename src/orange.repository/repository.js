var mongoose = require('mongoose'),
    config = require('../config');
mongoose.Promise = global.Promise;
mongoose.connect(config.db.url, {
    server: {
        poolSize: 20
    }
}, function(err) {
    if (err) {
        console.log('connect to ' + config.db.url + ' error: ' + err.message);
    }
});
exports.mongoose = mongoose;
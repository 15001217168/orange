var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var OauthTokenSchema = new schema({
    app_id: {
        type: String,
        default: ""
    },
    token: {
        type: String,
        default: ""
    },
    expire_date: {
        type: Date,
        default: Date.now,
    },
    is_blocked: {
        type: Boolean,
        default: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date,
        default: Date.now
    },
});

mongoose.model('OauthToken', OauthTokenSchema);
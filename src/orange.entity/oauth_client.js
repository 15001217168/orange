var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var OauthClientSchema = new schema({
    name: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: ""
    },
    app_id: {
        type: String,
        default: ""
    },
    app_secret: {
        type: String,
        default: ""
    },
    aes_key: {
        type: String,
        default: ""
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

mongoose.model('OauthClient', OauthClientSchema);
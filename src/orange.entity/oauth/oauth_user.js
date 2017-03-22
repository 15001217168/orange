var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var OauthUserSchema = new schema({
    phone: {
        type: String,
        default: ""
    },
    pwd: {
        type: String,
        default: ""
    },
    nick_name: {
        type: String,
        default: "",
    },
    avatar: {
        type: Boolean,
        default: false
    },
    signature: {
        type: String,
        default: '',
    },
    city: {
        code: "",
        name: ""
    },
    birthday: {
        type: String,
        default: "",
    },
    gender: {
        code: "",
        name: ""
    },
    app_id: {
        type: String,
        default: "",
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

mongoose.model('OauthUser', OauthUserSchema);
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
        type: String,
        default: ""
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
    is_hide_gender: {
        type: Number,
        default: 0
    },
    is_hide_birthday: {
        type: Number,
        default: 0
    },
    app_id: {
        type: String,
        default: "",
    },
    expire_date: {
        type: Date,
        default: Date.now
    },
    user_token: {
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

mongoose.model('OauthUser', OauthUserSchema);
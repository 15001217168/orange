var mongoose = require('mongoose');
var schema = mongoose.Schema;

var OrangeContentSchema = new schema({
    title: {
        type: String,
        default: ""
    },
    img: {
        type: String,
        default: ""
    },
    content: {
        type: String,
        default: ""
    },
    markdown: {
        type: String,
        default: ""
    },
    participle: [

    ],
    favourite: {
        type: String,
        default: ""
    },
    comment: {
        type: String,
        default: ""
    },
    lables: [{
        name: String,
        id: String
    }],
    type: {
        name: String,
        id: String
    },
    user: {
        name: String,
        id: String,
        avatar: String
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
mongoose.model('OrangeContent', OrangeContentSchema);
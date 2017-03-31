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
    des: {
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
    type_id: {
        type: String,
        default: "0000"
    },
    user_id: {
        type: String,
        default: "0000"
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
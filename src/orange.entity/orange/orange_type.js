var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var OrangeTypeSchema = new schema({
    name: {
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
    type: {
        id: String,
        name: String
    },
    content_count: {
        type: Number,
        default: 0
    },
    focus_count: {
        type: Number,
        default: 0
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

mongoose.model('OrangeType', OrangeTypeSchema);
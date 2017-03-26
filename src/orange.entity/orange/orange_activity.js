var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var OrangeActivitySchema = new schema({
    name: {
        type: String,
        default: ""
    },
    img: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: ""
    },
    sort: {
        type: Number,
        default: 0
    },
    content_ids: [

    ],
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

mongoose.model('OrangeActivity', OrangeActivitySchema);
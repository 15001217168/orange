var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var OrangeCommentSchema = new schema({
    content: {
        id: String,
        title: String,
    },
    comment: {
        type: String,
        default: ''
    },
    mark: {
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

mongoose.model('OrangeComment', OrangeCommentSchema);
var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var OrangeMarkSchema = new schema({
    name: {
        type: String,
        default: ""
    },
    comment: [{
        content: String,
        user: {
            name: String,
            id: String,
            avatar: String
        }
    }],
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

mongoose.model('OrangeMark', OrangeMarkSchema);
var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var LogSMSSchema = new schema({
    phone: {
        type: String,
        default: ""
    },
    verification_code: {
        type: String,
        default: ""
    },
    request: {},
    response: {},
    error: {},
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

mongoose.model('LogSMS', LogSMSSchema);
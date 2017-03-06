var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var OrangeSMSSchema = new schema({
    phone: {
        type: String,
        default: ""
    },
    verification_code: {
        type: String,
        default: ""
    },
    expire_date: {
        type: Date,
        default: Date.now,
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

mongoose.model('OrangeSMS', OrangeSMSSchema);
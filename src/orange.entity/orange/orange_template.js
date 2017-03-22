var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var OrangeTemplateSchema = new schema({
    name: {
        type: String,
        default: ""
    },
    code: {
        type: String,
        default: ""
    },
    des: {
        type: String,
        default: ""
    },
    type: {
        code: "",
        name: ""
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

mongoose.model('OrangeTemplate', OrangeTemplateSchema);
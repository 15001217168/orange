var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var OrangeTemplateContentSchema = new schema({
    template_id: {
        type: String,
        default: ""
    },
    sort: {
        type: Number,
        default: 0
    },
    content_id: {
        type: String,
        default: ""
    },
    content_name: {
        type: String,
        default: ""
    },
    content_img: {
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

mongoose.model('OrangeTemplateContent', OrangeTemplateContentSchema);
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
    contents: {
        id: "",
        name: "",
        img: "",
        create_date: ""
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
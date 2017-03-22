var mongoose = require('./repository').mongoose;
// models
require('../orange.entity/orange/orange_type');
require('../orange.entity/orange/orange_content');
require('../orange.entity/orange/orange_sms');
require('../orange.entity/orange/orange_template');
require('../orange.entity/orange/orange_template_content');

exports.OrangeContent = mongoose.model('OrangeContent');
exports.OrangeType = mongoose.model('OrangeType');
exports.OrangeSMS = mongoose.model('OrangeSMS');
exports.OrangeTemplate = mongoose.model('OrangeTemplate');
exports.OrangeTemplateContent = mongoose.model('OrangeTemplateContent');
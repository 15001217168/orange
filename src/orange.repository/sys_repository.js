var mongoose = require('./repository').mongoose;
// models
require('../orange.entity/sys/sys_user');

exports.SysUser = mongoose.model('SysUser');
var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var SysUserSchema = new schema({
	name: {
		type: String,
		default: ""
	},
	pwd: {
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

mongoose.model('SysUser', SysUserSchema);
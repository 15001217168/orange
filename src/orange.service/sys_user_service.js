var repository = require('../orange.repository/repository');
var SysUser = repository.SysUser;

exports.login = function(loginname, pwd, callback) {
	SysUser.findOne({
		name: loginname,
		pwd: pwd,
		is_blocked: false,
		is_deleted: false
	}, callback);
};

exports.register = function(name, pwd, callback) {

	var sysUser = new SysUser();
	sysUser.name = name;
	sysUser.pwd = pwd;

	sysUser.save(callback);
};
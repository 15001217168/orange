var repository = require('../orange.repository/sys_repository'),
	crypto = require('crypto'),
	SysUser = repository.SysUser;

exports.login = function (loginname, pwd, callback) {
	SysUser.findOne({
		name: loginname,
		is_blocked: false,
		is_deleted: false
	}, function (err, user) {
		if (err) {
			callback(err, null);
		}
		if (user) {
			var md5 = crypto.createHash("md5");
			md5.update(pwd);
			if (md5.digest("hex") == user.pwd) {
				callback(null, { username: user.name });
			}
			else
			{
				callback(new Error("用户名密码不正确"), null);
			}
		}
		else {
			callback(new Error("不存在改用户"), null);
		}
	});
};

exports.register = function (name, pwd, callback) {
	var sysUser = new SysUser(),
		md5 = crypto.createHash("md5");
	sysUser.name = name;
	md5.update(pwd);
	sysUser.pwd = md5.digest('hex');

	sysUser.save(callback);
};
exports.findById = function (id, callback) {
	SysUser.findById(id, function (err, user) {
		callback(err, user);
	});
};
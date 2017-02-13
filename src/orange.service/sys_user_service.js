var repository = require('../orange.repository/sys_repository'),
	crypto = require('crypto'),
	config = require('../config'),
	moment = require('moment'),
	utils = require('../orange/utils'),
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
			else {
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
exports.getUserById = function (id, callback) {
	var data = {
		id: 0,
		name: "",
		pwd: ""
	};
	if (id != 0) {
		SysUser.findById(id, function (err, doc) {
			if (err) {
				callback(err, data);
			}
			data.id = doc._id;
			data.name = doc.name;
			data.pwd = doc.pwd;
			callback(null, data);
		});
	}
	else {
		callback(null, data);
	}
};

exports.getUsers = function (pageindex, key, callback) {
	var size = config.page_size,
		start = (pageindex - 1) * size,
		search = {},
		pagination = {
			index: pageindex,
			size: size,
			pages: 0,
			total: 0,
		},
		list = [];

	if (key) {
		search.name = key;
	}
	SysUser.find(search).skip(start).limit(size).exec(function (err, docs) {
		if (err) {
			callback(err, [], pagination);
		}

		if (docs) {
			list = docs.map(function (v, i) {
				var item = {};
				item._id = v._id;
				item.no = start + i + 1;
				item.name = v.name;
				item.create_date = moment(v.create_date).format('YYYY- MM - DD HH:mm:ss');
				return item;
			});
		}
		SysUser.find(search, function (err, doc) {
			if (err) {
				callback(err, [], pagination);
			}
			var totalCount = doc.length;
			pagination.pages = parseInt((totalCount + size - 1) / size);
			pagination.total = totalCount;

			callback(null, list, pagination);
		});

	});
};

exports.saveUser = function (id, name, pwd, callback) {
	var item = new SysUser(),
		md5 = crypto.createHash("md5");
	if (id != 0) {
		md5.update(pwd);
		SysUser.findByIdAndUpdate(id, {
			update_date: new Date(),
			name: name,
			pwd: md5.digest('hex'),
		}, function (err, doc) {
			callback(err, doc);
		});
	}
	else {

		item.name = name;
		md5.update(pwd);
		item.pwd = md5.digest('hex');

		item.save(function (err, doc) {
			callback(err, doc);
		});
	}
};
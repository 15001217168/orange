var repository = require('../orange.repository/oauth_repository'),
	config = require('../config'),
	moment = require('moment'),
	utils = require('../orange/utils'),
	OauthClient = repository.OauthClient;

exports.getClientByAppId = function (appid, callback) {
	OauthClient.findOne({
		app_id: appid,
		is_blocked: false,
		is_deleted: false
	}, function (err, doc) {
		if (err) {
			callback(err, null);
		}
		if (doc) {
			callback(null, doc);
		}
		else {
			callback(new Error("为查找到该客户端"), null);
		}
	});
};
exports.getClientById = function (id, callback) {
	var data = {
		id: 0,
		name: "",
		type: ""
	};
	if (id != 0) {
		OauthClient.findById(id, function (err, doc) {
			if (err) {
				callback(err, data);
			}
			data.id = doc._id;
			data.name = doc.name;
			data.type = doc.type;
			callback(null, data);
		});
	}
	else {
		callback(null, data);
	}
};

exports.getClients = function (pageindex, key, callback) {
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
	OauthClient.find(search).skip(start).limit(size).exec(function (err, docs) {
		if (err) {
			callback(err, [], pagination);
		}

		if (docs) {
			list = docs.map(function (v, i) {
				var item = {};
				item._id = v._id;
				item.no = start + i + 1;
				item.name = v.name;
				item.type = v.type;
				item.appid = v.app_id;
				item.is_blocked = v.is_blocked ? '是' : '否';
				item.create_date = moment(v.create_date).format('YYYY- MM - DD HH:mm:ss');
				item.update_date = moment(v.update_date).format('YYYY- MM - DD HH:mm:ss');
				return item;
			});
		}
		OauthClient.find(search, function (err, doc) {
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

exports.saveClient = function (id, name, type, callback) {
	var item = new OauthClient();
	if (id != 0) {
		OauthClient.findByIdAndUpdate(id, {
			update_date: new Date(),
			name: name,
			type: type,
		}, function (err, doc) {
			callback(err, doc);
		});
	}
	else {
		item.name = name;
		item.type = type;
		item.app_id = "or" + utils.createUniqueId(7);
		item.app_secret = utils.createUniqueId(32);
		item.aes_key = utils.createUniqueId(20);
		item.save(function (err, doc) {
			callback(err, doc);
		});
	}
};
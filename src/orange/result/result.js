var Result = function(code, msg, data) {
    this.code = code || "9999";
    this.message = msg || "系统内部错误";
    this.data = data || {};
};

//成功
Result.success = function(msg, data) {
    return new Result('0000', msg);
};
//失败
Result.fail = function(msg) {
    return new Result('9999', msg);
};
//非空
Result.required = function(msg) {
    return new Result('8888', msg);
};
//失效
Result.invalid = function(msg) {
    return new Result('7777', msg);
};
var BizResult = function(error, msg, data, pagination) {
    this.error = error || false;
    this.message = msg || "系统内部错误";
    this.data = data || {};
    this.paginationpa = pagination || {
        index: 1,
        size: 12,
        pages: 0,
        total: 0,
    };
};
BizResult.success = function(msg, data, pagination) {
    return new BizResult(false, msg, data, paginationpa);
};
BizResult.error = function(msg) {
    return new BizResult(true, msg);
};
exports.Result = Result;
exports.BizResult = BizResult;
/**
 * Module dependencies.
 */
var Segment = require('segment');

exports.participle = function(content, callback) {
    var arr = [];
    try {
        var segment = new Segment();
        segment.useDefault();
        arr = segment.doSegment(content)
    } catch (ex) {}
    callback(arr);
};
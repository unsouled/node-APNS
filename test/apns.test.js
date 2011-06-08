var apns = require('../lib/apns');
var nodeunit = require('nodeunit');

module.exports = nodeunit.testCase({
    setUp: function(callback) {
        callback();
    },
    tearDown: function(callback) {
        callback();
    },
    testValidPush: function(test) {
        var validOptions = {};
        apns.push(options, function() {
            test.done();
        });
    },
});

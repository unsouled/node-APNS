var apns = require('../lib/apns');
var nodeunit = require('nodeunit');

module.exports = nodeunit.testCase({
    setUp: function(callback) {
        invalidToken = 'gfeaws';
        validNotRegisteredToken = '00000000';
        validRegisteredToken = '11111111';
        callback();
    },
    tearDown: function(callback) {
        callback();
    },
    testValidPush: function(test) {
        var validOptions = {
            deviceToken: validRegisteredToken
        };
        apns.push(validOptions, function() {
            test.done();
        });
    },
    testValidEnhancedPush: function(test) {
        var validOptions = {};
        apns.enhancedPush(validOptions, function() {
            test.done();
        });
    },
    testInvalidTokenEnhancedPush: function(test) {
        var invalidOptions = {};
        var request = apns.enhancedPush(invalidOptions, function() {});
        request.on('error', function(status, message) {
            test.equals(apns.errorCode.INVALID_TOKEN, status);
            test.done();
        });
    },
    testMissingPayloadEnhancedPush: function(test) {
        var invalidOptions = {};
        var request = apns.enhancedPush(invalidOptions, function() {});
        request = apns.on('error', function(status, message) {
            test.equals(apns.errorCode.MISSING_PAYLOAD, status);
            test.done();
        });
    },
    testInvalidTokenSizeEnhancedPush: function(test) {
        var invalidOptions = {};
        var request = apns.enhancedPush(invalidOptions, function() {});
        request = apns.on('error', function(status, message) {
            test.equals(apns.errorCode.INVALID_TOKEN_SIZE, status);
            test.done();
        });

    },
    testInvalidPayloadSizeEnhancedPush: function(test) {
        var invalidOptions = {};
        var request = apns.enhancedPush(invalidOptions, function() {});
        request.on('error', function(status, message) {
            test.equals(apns.errorCode.INVALID_PAYLOAD_SIZE, status);
            test.done();
        });
    },
});

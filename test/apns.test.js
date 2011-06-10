var apns = require('../lib/apns');
var nodeunit = require('nodeunit');

module.exports = nodeunit.testCase({
    setUp: function(callback) {
        invalidToken = 'gfeaws';
        validNotRegisteredToken = '0000000000000000000000000000000000000000000000000000000000000000';
        validRegisteredToken = 'b071e0ecebc859e60310f7671d7d1bd3dbc2b760ed258fbe3d76ec974ccd4e89';
        callback();
    },
    tearDown: function(callback) {
        callback();
    },
    testValidPush: function(test) {
        var validOptions = {
            deviceToken: validRegisteredToken,
            payload: {
                alert: 'Hello, APNS'
            }
        };
        apns.push(validOptions, function() {
            test.done();
        });
    },
    /*
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
    */
});

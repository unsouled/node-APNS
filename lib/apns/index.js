var Connection = require('connection');
var Request = require('request');
var response = require('response');

function push(options, callback) {
    var connection = Connection.connect();
    connection.on('connect', function() {
        var request = new Request(options, connection);
        request.once('response', callback);
        return request;
    });
}

function enhancedPush(options, callback) {
}

module.exports.errorCode = require('./error_code');
module.exports.push = push;
module.exports.enhancedPush = enhancedPush;

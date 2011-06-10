var Connection = require('./connection');
var Request = require('./request');
var response = require('./response');

function push(options, callback) {
    var connection = Connection.connect(options, callback);
    connection.once('end', function() { console.log('end'); });
    connection.once('close', function() { console.log('close'); });
}

function enhancedPush(options, callback) {
}

module.exports.errorCode = require('./error_code');
module.exports.push = push;
module.exports.enhancedPush = enhancedPush;

var fs = require('fs');
var tls = require('tls');
var net = require('net');
var stream = require('stream');
var util = require('util');

function ApnsConnection() {
}

ApnsConnection.SANDBOX_ENDPOINT = 'gateway.sandbox.push.apple.com';
ApnsConnection.ENDPOINT = 'gateway.push.apple.com';
ApnsConnection.PORT = 2195

ApnsConnection.connect = function(isSandbox) {
    var options = {
        key: fs.readFileSync("key-noenc.pem", encoding='ascii'),
        cert: fs.readFileSync("cert.pem", encoding='ascii')
    };

    if (!isSandbox) {
        isSandbox = false;
    }

    var connection = new ApnsConnection();
    var endpoint = isSandbox ? ApnsConnection.SANDBOX_ENDPOINT : ApnsConnection.ENDPOINT;
    var socket = tls.connect(443, endpoint, options, function() {
        connection.connect(ApnsConnection.PORT, endpoint);
    });
    return connection;
}

util.inherits(ApnsConnection, net.Socket);
module.exports = ApnsConnection;

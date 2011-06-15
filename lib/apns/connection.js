var fs = require('fs');
var tls = require('tls');
var net = require('net');
var stream = require('stream');
var util = require('util');
var Token = require('./token');
var config = require('../../config/config');

ApnsConnection.SANDBOX_ENDPOINT = 'gateway.sandbox.push.apple.com';
ApnsConnection.ENDPOINT = 'gateway.push.apple.com';
ApnsConnection.PORT = 2195

function ApnsConnection() {
    net.Socket.call(this);
}

ApnsConnection.getEndpoint = function(isSandbox) {
    return isSandbox ? ApnsConnection.SANDBOX_ENDPOINT : ApnsConnection.ENDPOINT;
}

ApnsConnection.connect = function(pushOptions, callback, isSandbox) {
    var options = {
        key: fs.readFileSync(config['SslKeyFilePath'], encoding='ascii'),
        cert: fs.readFileSync(config['SslCertFilePath'], encoding='ascii'),
    };

    var endpoint = ApnsConnection.getEndpoint(isSandbox);
    var socket = tls.connect(ApnsConnection.PORT, endpoint, options, function() {
        var token = Token.parse(pushOptions['deviceToken']);
        var payload = JSON.stringify({
            aps: pushOptions['payload']
        });
        var buffer= new Buffer(1 + 2 + token.length + 2 + payload.length);

        pos = 0;
        buffer[pos] = 0;
        pos += 1;
        buffer[pos] = 0;
        pos += 1;
        buffer[pos] = token.length;
        pos += 1;

        for (var i = 0; i < token.length; i += 1) {
            buffer[pos] = token[i];
            pos += 1;
        }

        buffer[pos] = 0;
        pos += 1;

        buffer[pos] = payload.length;
        pos += 1;

        for (var i = 0; i < payload.length; i++) {
            buffer[pos] = payload[i].charCodeAt();
            pos += 1;
        }

        socket.write(buffer);
        callback();
    });
    return socket;
}

util.inherits(ApnsConnection, net.Socket);

module.exports = ApnsConnection;

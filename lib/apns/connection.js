var fs = require('fs');
var tls = require('tls');
var net = require('net');
var stream = require('stream');
var util = require('util');

function ApnsConnection() {
    net.Socket.call(this);
}

function parseToken(token) {
    token = token.replace(/\s/g, "")
    length = Math.ceil(token.length / 2);
    hexToken = new Buffer(length);
    for(var i=0; i < token.length; i+=2) {
        word = token[i];
        if((i + 1) >= token.length || typeof(token[i+1]) === undefined) {
            word += '0';
        }
        else {
            word += token[i+1];
        }
        hexToken[i/2] = parseInt(word, 16);
    }
    return hexToken;
}

ApnsConnection.SANDBOX_ENDPOINT = 'gateway.sandbox.push.apple.com';
ApnsConnection.ENDPOINT = 'gateway.push.apple.com';
ApnsConnection.PORT = 2195

ApnsConnection.getEndpoint = function(isSandbox) {
    return isSandbox ? ApnsConnection.SANDBOX_ENDPOINT : ApnsConnection.ENDPOINT;
}

ApnsConnection.connect = function(pushOptions, callback, isSandbox) {
    var options = {
        key: fs.readFileSync('pdartGlobal.pro.pem', encoding='ascii'),
        cert: fs.readFileSync('pdartGlobal.pro.pem', encoding='ascii'),
        // key: fs.readFileSync('node-mock-apns.key.pem', encoding='ascii'),
        // cert: fs.readFileSync('node-mock-apns.cert.pem', encoding='ascii')
    };

    var endpoint = ApnsConnection.getEndpoint(isSandbox);
    var socket = tls.connect(ApnsConnection.PORT, endpoint, options, function() {
        var token = parseToken(pushOptions['deviceToken']);
        var payload = JSON.stringify({
            aps: pushOptions['payload']
        });
        console.log(payload);
        var buffer= new Buffer(1 + 2 + token.length + 2 + payload.length);
        pos = 0;
        buffer[pos] = 0;
        pos += 1;
        buffer[pos] = 0;
        pos += 1;
        buffer[pos] = parseInt(token.length, 16);
        pos += 1;

        for (var i = 0; i < token.length; i += 1) {
            buffer[pos] = token[i];
            pos += 1;
        }

        buffer[pos] = 0;
        pos += 1;

        buffer[pos] = payload.length;
        pos += 1;

        console.log(payload.length);
        for (var i = 0; i < payload.length; i++) {
            buffer[pos] = payload[i].charCodeAt();
            pos += 1;
        }

        console.log(buffer);
        socket.write(buffer);
        callback();
    });
    return socket;
}

util.inherits(ApnsConnection, net.Socket);

module.exports = ApnsConnection;

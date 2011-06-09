var stream = require('stream');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Request(options, connection) {
    stream.Stream.call(this);
    this._options = options;
    this._connection = connection;
    this.push();
}

Request.prototype.push = function() {
    this._connection.write(data, encdoing, function() {
        this.emit('response', response);
    });
}

util.inherits(Request, EventEmitter);

module.exports = Request;

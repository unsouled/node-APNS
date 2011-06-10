var stream = require('stream');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Response(request) {
    stream.Stream.call(this);
}

util.inherits(Response, EventEmitter);

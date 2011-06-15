var Token = {};

Token.parse = function(token) {
    token = token.replace(/\s/g, "")
    length = Math.ceil(token.length / 2);
    hexToken = new Buffer(length);
    for (var i = 0; i < token.length; i += 2) {
        word = token[i];
        if ((i + 1) >= token.length || typeof(token[i + 1]) === undefined) {
            word += '0';
        } else {
            word += token[i + 1];
        }
        hexToken[i / 2] = parseInt(word, 16);
    }
    return hexToken;
}

module.exports = Token

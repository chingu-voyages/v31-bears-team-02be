"use strict";

var detect = require('./detect');

var getLineEnding = function(type) {

  if ( ['CR', 'LF', 'CRLF'].indexOf(type) === -1) {
    throw new Error("Line ending '" + type + "' is not supported, use CR, LF or CRLF");
  }

  if (type === 'LF') {
    return '\n';
  }

  if (type === 'CR') {
    return '\r';
  }

  if (type === 'CRLF') {
    return '\r\n';
  }
};

module.exports = function( source, lineEnding ){
  var current = detect(source);

  if (current === lineEnding ) {
    return source;
  }

  return source.replace(new RegExp(getLineEnding(current), 'g'), getLineEnding(lineEnding));
};

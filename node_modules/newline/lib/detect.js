"use strict";

module.exports = function( source ){
  var cr   = source.split("\r").length;
  var lf   = source.split("\n").length;
  var crlf = source.split("\r\n").length;

  if ( cr + lf === 0 ) {
    return "NONE";
  }

  if ( crlf === cr && crlf === lf ) {
    return "CRLF";
  }

  if (cr > lf) {
    return "CR";
  } else {
    return "LF";
  }
};

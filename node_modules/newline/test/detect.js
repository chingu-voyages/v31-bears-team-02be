"use strict";

require("should");
var detect = require("../lib/detect.js");

var generateSample = function(lineEnd) {
  return "This is a test" + lineEnd +
         "file with some " + lineEnd +
         "new lines, useful" + lineEnd +
         "testing the library";
};

var lf = generateSample("\n");
var cr = generateSample("\r");
var crlf = generateSample("\r\n");

describe('newline.detect', function () {
  it('should detect LF', function() {
    detect(lf).should.equal("LF");
  });

  it('should detect CR', function() {
    detect(cr).should.equal("CR");
  });

  it('should detect CRLF', function() {
    detect(crlf).should.equal("CRLF");
  });
});

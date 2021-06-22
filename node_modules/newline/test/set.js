"use strict";

require("should");
var detect = require("../lib/detect.js");
var set = require("../lib/set.js");

var generateSample = function(lineEnd) {
  return "This is a test" + lineEnd +
         "file with some " + lineEnd +
         "new lines, useful" + lineEnd +
         "testing the library";
};

var lf = generateSample("\n");
var cr = generateSample("\r");
var crlf = generateSample("\r\n");

describe('newline.set', function () {
  it('should convert LF to CRLF', function() {
    var replaced = set(lf, 'CRLF');
    detect(replaced).should.equal("CRLF");
  });

  it('should convert LF to CR', function() {
    var replaced = set(lf, 'CR');
    detect(replaced).should.equal("CR");
  });

  it('should preserve LF', function() {
    var replaced = set(lf, 'LF');
    detect(replaced).should.equal("LF");
  });

  it('should convert CRLF to LF', function() {
    var replaced = set(crlf, 'LF');
    detect(replaced).should.equal("LF");
  });

  it('should convert CRLF to CR', function() {
    var replaced = set(crlf, 'CR');
    detect(replaced).should.equal("CR");
  });

  it('should preserve CRLF', function() {
    var replaced = set(crlf, 'CRLF');
    detect(replaced).should.equal("CRLF");
  });

  it('should convert CR to CRLF', function() {
    var replaced = set(cr, 'CRLF');
    detect(replaced).should.equal("CRLF");
  });

  it('should convert CR to LF', function() {
    var replaced = set(cr, 'LF');
    detect(replaced).should.equal("LF");
  });

  it('should preserve CR', function() {
    var replaced = set(cr, 'CR');
    detect(replaced).should.equal("CR");
  });
});

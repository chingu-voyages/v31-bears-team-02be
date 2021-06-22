"use strict";
/*jshint expr: true*/

require("should");
var newline = require("../index.js");

describe('newline api', function () {
  it('should have a detect method', function() {
    newline.detect.should.be.a.Function;
  });

  it('should have set method', function(){
    newline.set.should.be.a.Function;
  });
});

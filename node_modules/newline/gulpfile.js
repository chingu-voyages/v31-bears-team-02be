"use strict";

var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha = require('gulp-mocha');

var paths = {
  scripts: ['gulpfile.js', 'index.js', 'lib/*', 'test/*']
};

gulp.task('lint', function(){
  var jshintConfig = require("./package").jshintConfig;

  gulp.src(paths.scripts)
    .pipe(jscs())
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish));
});

gulp.task('unittests', function(){
  gulp.src(paths.scripts)
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['lint', 'test']);
});

gulp.task('test', ['lint', 'unittests']);
gulp.task('default', ['test']);

'use strict';

var
  gulp = require('gulp'),
  del = require('del');

gulp.task('_clean', function () {
  return del(['./target']);
});

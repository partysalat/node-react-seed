var gulp = require('gulp');
require("require-dir")("./gulp/tasks");
var sequence = require("run-sequence");

gulp.task("default", function (done) {
  sequence(
    '_clean',
    '_scripts:watch',
    "_server",'_watch',
    done
  );
});
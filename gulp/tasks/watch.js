var gulp = require("gulp");
var path = require("path");
var bs = require("browser-sync");

gulp.task('_watch', function () {
  //gulp.watch()
  console.log(path.resolve(__dirname + "./../../target/assets/**/*.js"))
  gulp.watch(path.resolve(__dirname + "./../../target/assets/**/*.js"), ["_reload"]);
  gulp.watch(path.resolve(__dirname + "./../../src/server/**/*"), ["_server:restart"]);
});

gulp.task("_reload", function () {
  bs.reload();
});

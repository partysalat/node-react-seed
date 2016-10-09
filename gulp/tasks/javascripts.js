'use strict';

var
  gulp = require("gulp"),
  webpack = require("webpack"),
  _ = require("lodash"),
  webpackStream = require("webpack-stream");

var webpackRawConfig = require('./../../webpack.config.js');

gulp.task('_scripts:watch', function (done) {
  let webpackConfig = _.assign({}, webpackRawConfig, {
    devtool: 'source-map',
    output:{
      filename:"bundle.js"
    },
    watch: true
  });
  compile(webpackConfig,_.once(done));
});

gulp.task('_scripts:dev', function () {
  return compile(_.assign({}, webpackRawConfig, {
    output:{
      filename:"dev-bundle.js",
    }
  }));
});

gulp.task('_scripts', function () {
  let webpackConfig = _.cloneDeep(webpackRawConfig);

  webpackConfig.plugins = webpackConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true
      }
    })
  );
  return compile(webpackConfig);
});

function compile(webpackConfig, callback) {
  return gulp.src("I_DOnT_EXisST")
    .pipe(webpackStream(webpackConfig, webpack, callback || _.noop))
    .pipe(gulp.dest('target/assets'));
}
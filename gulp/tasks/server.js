'use strict';

var
  gulp = require('gulp'),

  bs = require("browser-sync"),
  config = require("./../config"),
  server = require('gulp-develop-server');

gulp.task("_server:restart",function(done){
  server.restart(function(err){

    if(!err){
      bs.reload();
    }

    done(err);
  });
});

gulp.task('_server', function (done) {

  process.on('exit', function() {
    server.kill();
  });

  return server.listen({
    path: './dutrinkst.js',
    delay: 0,
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development'
    },
    successMessage: /server_started/
  },  function(){

    bs({
      proxy:"http://localhost:"+config.port,
      open:false
    });

    done();
  });
});
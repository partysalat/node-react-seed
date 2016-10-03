/*jslint node: true*/
"use strict";

var
  server,
  hapi = require('hapi'),
  logger = require("./utils/logger"),
  routes = require('hapi-auto-routes');


function create(connectionSettings, callback) {

  server = new hapi.Server();
  server.connection(connectionSettings);


  server.register([
      require('inert'),
      require('vision')
    ],
    function (pluginInitializationErrors) {

      if (pluginInitializationErrors) {
        logger.error('search-app failed to start: ', pluginInitializationErrors);
        callback(pluginInitializationErrors);
      }

      routes.bind(server).register({
        pattern: __dirname + '/routes/*.js'
      });


      server.views({
        engines: {
          jade: require('jade')
        },
        path: __dirname + '/views'
      });

      callback(null, server);
    });


  return server;
}

module.exports.create = create;
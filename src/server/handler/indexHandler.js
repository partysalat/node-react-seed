var manifest = require("./../../../target/rev-manifest.json");
var _ = require("lodash");
module.exports = function (request, reply) {
  let bundleName = _.isArray(manifest.main)?_.first(manifest.main):manifest.main;
  reply.view("index", {bundleJs: `/internal/assets/${bundleName}`});
};
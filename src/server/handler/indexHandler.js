var manifest = require("./../../../target/rev-manifest.json");

module.exports = function(request,reply){
  reply.view("index",{bundleJs:`/internal/assets/${manifest.main}`});
};
var path = require("path");
module.exports = [
  {
    method: 'GET',
    path: '/internal/assets/{filename*}',
    handler: {
      directory: {
        path: path.resolve(__dirname + '/../../../target/assets'),
        redirectToSlash: true
      }
    }
  }
];

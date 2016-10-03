var
  webpack = require("webpack"),
  mkdirp = require("mkdirp"),
  path = require("path");

module.exports = {
  entry: "./src/browser/App.jsx",
  output: {
    //path: __dirname,
    filename: "bundle-[hash].js"
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    function () {
      this.plugin("done", function (stats) {
        mkdirp.sync(path.join(__dirname, "target"));
        require("fs").writeFileSync(
          path.join(__dirname, "target", "rev-manifest.json"),
          JSON.stringify(stats.toJson().assetsByChunkName));
      });
    }

  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.styl/,
        loader: "ignore-loader"
      }
    ]
  }
};
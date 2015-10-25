'use strict';
/*
  ## Webpack Configuration
  This file is used for both testing under
  [karma-webpack](https://github.com/webpack/karma-webpack)
  and [gulp-webpack](https://github.com/shama/gulp-webpack).
*/
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
  Uncomment next 2 lines to support an includePath of the bootstrapPathStylesheets
*/
//var bootstrapPathStylesheets = path.resolve(__dirname, "./node_modules/bootstrap-sass/assets/stylesheets");
//console.log("boostrapPathStylesheets %s", boostrapPathStylesheets);

module.exports = {
  cache: true,
  entry: [
    './assets/scripts/main.js',
    'bootstrap-sass!./assets/bootstrap-sass.config.js'
  ],
  output: {
   path: path.join(__dirname, './dist'),
   publicPath: '../',
   filename: 'js/app.js'
  },
  module: {
        loaders: [
            { test: /jquery\/src\/selector\.js$/, loader: 'amd-define-factory-patcher-loader' },
            // **IMPORTANT** This is needed so that each bootstrap js file required by
            // bootstrap-sass-loader has access to the jQuery object
            { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
            { test: /\.scss$/, loader: 'style!css!sass?outputStyle=expanded' },

            // ToDo: custom path and source map option did not work
            //{ test: /\.scss$/,
            //  loader: "style!css!sass?outputStyle=expanded&sourceMap=true&includePaths[]=" + bootstrapPathStylesheets },

            // Needed for the css-loader when [bootstrap-sass-loader](https://github.com/justin808/bootstrap-sass-loader)
            // loads bootstrap's css.
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=10000&minetype=application/font-woff&name=fonts/[hash].[ext]' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&minetype=application/octet-stream&name=fonts/[hash].[ext]' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: 'url?limit=10000&minetype=application/font-woff&name=fonts/[hash].[ext]' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file?name=fonts/[hash].[ext]' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url?limit=10000&minetype=image/svg+xml&name=fonts/[hash].[ext]' }
        ]
    },
    plugins: [
      new ExtractTextPlugin('css/styles.css')
    ]
};

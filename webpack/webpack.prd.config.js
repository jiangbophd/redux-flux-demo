
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PATHS = require('./paths');

module.exports = function prdConfig() {
  return {
    entry: {
      app: [PATHS.src],
    },
    output: {
      filename: '[name].[chunkhash]-bundle.js',
      chunkFilename: '[name].[chunkhash]-chunk.js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                },
              },
            ],
          }),
          exclude: PATHS.src,
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(PATHS.dist, {
        root: process.cwd(),
        verbose: true,
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: ({ context }) => context.indexOf('node_modules') !== -1,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // React doesn't support IE8
          warnings: true,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: true,
          screw_ie8: true,
        },
      }),
      new ExtractTextPlugin({
        filename: '[name].[chunkhash].css',
        disable: false,
        allChunks: true,
      })
    ],
  };
};

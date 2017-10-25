const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = require('./paths');

module.exports = {
  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [PATHS.src, 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: PATHS.src,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/, /\.svg$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/[name].[ext]',
        },
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'static/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.publicHtml,
      inject: 'body',
      title: 'React Redux Starter',
    })
  ],
};

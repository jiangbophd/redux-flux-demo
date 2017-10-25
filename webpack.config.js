const merge = require('webpack-merge');
const baseConfig = require('./webpack/webpack.base.config');
const devConfig = require('./webpack/webpack.dev.config');
const prdConfig = require('./webpack/webpack.prd.config');

const TARGET = process.env.npm_lifecycle_event;
module.exports = function webpackConfig(env) {
  if (TARGET.includes('dist')) {
    return merge.smart(baseConfig, prdConfig(env));
  }
  return merge.smart(baseConfig, devConfig(env));
};

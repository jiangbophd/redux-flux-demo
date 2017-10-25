const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require('proxy-middleware');
const url = require('url');
const morgan = require('morgan');
const yargs = require('yargs');
const compress = require('compression');
const favicon = require('serve-favicon');
const webpackConfig = require('./webpack.config')();

const config = {
  host: 'localhost',
  port: yargs.argv.production ? 3005 : 3010,
  proxyUrl: '',
};
const PATHS = {
  dist: path.join(__dirname, 'dist'),
  indexHtml: path.join(__dirname, 'dist', 'index.html'),
  publicFavicon: path.join(__dirname, 'public', 'favicon.ico'),
};

const logger = console;
const app = express();

if (!yargs.argv.production) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'app',
    stats: {
      colors: true,
      timings: true,
      chunks: false,
    },
  });

  app.use(morgan('dev'));
  app.use(favicon(PATHS.publicFavicon));
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use('/api', proxy(url.parse(`${config.proxyUrl}/$api`)));

  app.get(/^((?!\/api).)*$/, (req, res) => {
    // eslint-disable-next-line no-sync
    res.write(middleware.fileSystem.readFileSync(PATHS.indexHtml));
    res.end();
  });
} else {
  
  logger.info('serving production');
  app.use(compress()); // gzip
  app.use(favicon(PATHS.publicFavicon));
  app.use(express.static(PATHS.dist));
  app.use('/api', proxy(url.parse(`${config.proxyUrl}/$api`)));
  app.get(/^((?!\/api).)*$/, (req, res) => {
    res.sendFile(PATHS.indexHtml);
  });
}

app.listen(config.port, config.host, err => {
  if (err) {
    logger.log(err);
  }
  logger.info('Open http://%s:%s in your browser.', config.host, config.port);
});

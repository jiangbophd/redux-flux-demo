const path = require('path');

module.exports = {
  src: path.join(__dirname, '..', 'src'),
  dist: path.join(__dirname, '..', 'dist'),
  public: path.join(__dirname, '..', 'public'),
  publicHtml: path.join(__dirname, '..', 'public', 'index.html')
};

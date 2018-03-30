const path = require('path');

module.exports = {
  entry: './src/sendToServer.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development'
};
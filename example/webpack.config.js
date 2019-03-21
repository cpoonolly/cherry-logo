const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


  module.exports = {
    entry: './index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HtmlWebpackPlugin({filename: 'index.html', template: 'index.html'}),
      new HtmlWebpackPlugin({filename: 'cherry-brackets.html', template: 'cherry-brackets.html'}),
      new HtmlWebpackPlugin({filename: 'cherry-logo.html', template: 'cherry-logo.html'}),
      new HtmlWebpackPlugin({filename: 'cherry-swarm.html', template: 'cherry-swarm.html'}),
      new HtmlWebpackPlugin({filename: 'demo.html', template: 'demo.html'})
    ]
  };
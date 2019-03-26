const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const DEV_CONFIG = {
  entry: './index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
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

const PROD_CONFIG = {
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

module.exports = (env) => {
  return (env === 'dev' ? DEV_CONFIG : PROD_CONFIG);
}
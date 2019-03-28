const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
  ],
  module:{
    rules:[{
      test: /\.html$/,
      use: [
        'html-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }]
  }
};

const DEV_CONFIG = Object.assign({}, PROD_CONFIG, {
  mode: 'development',
  devtool: 'inline-source-map'
});

module.exports = (env) => {
  return (env === 'dev' ? DEV_CONFIG : PROD_CONFIG);
}
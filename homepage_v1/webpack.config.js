const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PROD_CONFIG = {
  entry: {
    index: './index.js',
    info: './info.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: ['index'],
      favicon: './imgs/favicon.ico'}
    ),
    new HtmlWebpackPlugin({
      filename: 'info.html',
      template: 'info.html',
      chunks: ['info'],
      favicon: './imgs/favicon.ico'
    })
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
      test: /\.(png|svg|jpg|gif|jpeg)$/,
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
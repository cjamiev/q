const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
  process.env.NODE_ENV = 'production';

  return {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, '../server/static'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '*'],
      modules: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../utils'), 'node_modules']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.html$/,
          use: [
            'html-loader'
          ]
        },
        {
          test: /\.(svg|png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve('./src/index.html') }),
      new webpack.DefinePlugin({ 'process.env': JSON.stringify(env) }),
      new ESLintPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../../coverage/webpack-analyzer-report.html'
      })
    ]
  };
};


const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  process.env.NODE_ENV = 'development';

  return {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].bundle.js'
    },
    watchOptions: {
      ignored: ['**/*package.json']
    },
    devServer: {
      historyApiFallback: true,
      port: 2000,
      open: true,
      proxy: [
        {
          context: ['**'],
          target: 'http://localhost:1000'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '*'],
      modules: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../utils'), 'node_modules']
    },
    devtool: 'source-map',
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: { test: /[\\/]node_modules[\\/]/, name: 'common', chunks: 'all' }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
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
      new ESLintPlugin()
    ]
  };
};


const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

// const nodeModulesDir = path.join(__dirname, 'node_modules');

const isDev = process.env.NODE_ENV === 'development';
const isHot = !!process.env.HOT;

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev && 'cheap-module-source-map',
  context: __dirname,
  entry: {
    app: ['./frontend/index.tsx'],
  },
  resolve: {
    modules: ['./frontend', 'node_modules'],
    extensions: ['.css', 'scss', '.json', '.js', '.jsx', '.ts', '.tsx'],
    alias: _.pickBy({
      'react-dom': isHot && '@hot-loader/react-dom',
    }),
  },
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: '[name].js',
    publicPath: '/assets/',
    chunkFilename: '[name]-[hash].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: ['awesome-typescript-loader'],
        exclude: /node-modules/,
      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: ['url-loader'],
      },
    ],
  },
  plugins: _.compact([
    !isDev && new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.NamedModulesPlugin(),
    new HTMLWebpackPlugin(),
    new CopyPlugin([
      {
        from: path.join(__dirname, 'assets', 'img'),
        to: path.join(__dirname, 'public', 'assets', 'img'),
      },
      // {
      //   from: path.join(__dirname, 'assets', 'index.html'),
      //   to: path.join(__dirname, 'public', 'assets', 'index.html'),
      // },
    ]),
  ]),
  devServer: {
    host: 'localhost',
    port: 4000,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'assets'),
    publicPath: '/assets/',
  },
};

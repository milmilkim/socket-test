const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const myOption = require('./my.config');
// const pages = ['index'];

module.exports = {
  mode: 'development',
  // entry: pages.reduce((config, page) => {
  //   config[page] = `./src/${page}.js`;
  //   return config;
  // }, {}),

  entry: {
    index: './src/index.js',
  },

  output: {
    filename: 'images/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  //ejs(템플릿)
  // plugins: [].concat(
  //   pages.map(
  //     (page) =>
  //       new HtmlWebpackPlugin({
  //         inject: true,
  //         template: `./src/${page}.ejs`,
  //         filename: `${page}.html`,
  //         chunks: [page],
  //       })
  //   )
  // ),
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: `./src/index.ejs`,
      filename: './index.html',
      chunks: ['index'],
      title: 'hello',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: `./src/header.ejs`,
      filename: './header.html',
      chunks: ['index'],
      title: 'hello',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[name].css',
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },

    watchFiles: ['./src/*.ejs'],
    hot: true,

    compress: true,
    port: 3030,
  },
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = ['index', 'subpage'];

module.exports = {
  mode: 'development',
  watch: true,
  //엔트리
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.js`;
    return config;
  }, {}),
  //ejs(템플릿)
  plugins: [].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./src/${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
        })
    )
  ),
  //아웃풋 (자바스크립트를 하나로 말아줌)
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  //모듈.. css, scss 같은 애들을 하나로 말아줌
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      //바벨(트랜스파일러)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  //개발용 서버
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 5000,
  },
};

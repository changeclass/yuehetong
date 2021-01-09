/**
 * @description: webpack入口
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-01-08 18:58:49
 * @LastEditTime: 2021-01-08 18:58:49
 * @LastEditors: 小康
 */
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptiomizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: '[chunkhash:8].js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1 * 1024,
              name: 'img/[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        // 处理html中引入的图片
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css' //对输出的文件进行重命名,默认为main.css
    }),
    // 压缩CSS
    new OptiomizeCssAssetsWebpackPlugin()
  ],
  mode: process.env.NODE_ENV,
  devServer: {
    // 构建后的路径
    contentBase: resolve(__dirname, 'dist'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 8000,
    hot: true,
    open: true
  }
}

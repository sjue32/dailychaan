const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.resolve(__dirname, './src/client/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        // use: [MiniCSSExtractPlugin.loader, "style-loader", "css-loader"],
        // usually set up without style-loader in docs/blogs
        use: [MiniCSSExtractPlugin.loader, "css-loader"],

      },
      {
        test: /\.(ico|png|jep?g|gif)$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      filename: './index.html',
      favicon: './src/client/favicon.ico',
    }),
    new MiniCSSExtractPlugin({
      filename: "[name].css",
      // chunkFilename: "[name].css",
    }),
    // new BundleAnalyzerPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    proxy: {
      '/': 'http://localhost:3000',
      secure: false
    }
  },
  devtool: 'source-map',
}
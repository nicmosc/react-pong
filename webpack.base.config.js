const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const rootDirs = [
  path.resolve(__dirname, 'app'),
];


module.exports = {
  resolve: {
    modules: [
      ...rootDirs,
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.less'],
  },
  entry: {
    main: [ './app/app.js' ],
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: 'bundle',
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Pong',
      filename: path.resolve(__dirname, 'docs/index.html'),
      template: path.resolve(__dirname, 'server/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: rootDirs,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 'react', ['latest', { 'es2015': { 'modules': false } }], 'stage-0' ],
              plugins: [ 'react-hot-loader/babel' ],
            },
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [ autoprefixer ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [ autoprefixer ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.otf$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.eot$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};

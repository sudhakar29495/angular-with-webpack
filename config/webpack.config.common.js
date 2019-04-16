const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    polyfills: './src/polyfills.ts',
    main: './src/main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: isDev } },
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } }
        ],
        include: helpers.root('src', 'assets')
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'to-string-loader',
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } }
        ],
        include: helpers.root('src', 'app')
      },
      {
        test: /\.svg$/,
        use: [
          { loader: 'file-loader', options: { sourceMap: isDev } },
        ],
        include: helpers.root('src', 'assets/img')
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      helpers.root('dist'), { root: helpers.root(), verbose: true }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const deps = require('./package.json').dependencies
module.exports = {
  //entry: { index: path.resolve(__dirname, 'src', 'App.jsx') },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },

  devServer: {
    contentBase: './dist',
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'chat',
      library: { type: 'var', name: 'chat' },
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './Chat': './src/Chat',
      },
      shared: require('./package.json').dependencies,
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],
}

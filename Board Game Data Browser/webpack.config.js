// Include the 'path' module
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

// Export webpack configuration options
module.exports = {
  // Configure webpack basics
  mode: 'development',
  watch: true,
  devtool: 'cheap-source-map',

  // Setup the entry point and output
  entry: './client/index.jsx',
  output: {
    path: path.resolve('dist'), // Put info in here
    publicPath: './',
    filename: 'index_bundle.js' // Output to this file
  },

  plugins: [
    // Setup the HTML script injector plugin
    new HtmlWebpackPlugin({
      template: './client/index.html', // Indicate where our file currently is
      filename: 'index.html', // Generate a new version of the template which goes to the /dist folder
      inject: 'body' // Throw the code into the body of the HTML file
    })
  ],

  // Setup rules for all the file types
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: path.resolve('node_modules'),
        resolve: { extensions: ['.js', '.jsx'] }
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
}
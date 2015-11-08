var webpack = require('webpack');

module.exports = {

  entry: {
    app: [
      './app/app.js'
    ]
  },

	output: {
    path: __dirname + '/build',
		filename: 'bundle.js'
	},

  plugins: [
    new webpack.NoErrorsPlugin()
  ],


	module: {
		loaders: [
      { test: /\.jsx?$/, loaders: ['babel'], include: __dirname + '/app' },
			{ test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['file'] }
		]
	},

	devtool: 'source-map'
};
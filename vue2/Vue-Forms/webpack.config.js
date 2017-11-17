let webpack = require('webpack');
let path = require('path');

module.exports = {
	entry: {
		app: './resources/assets/js/app.js',
		vendor: ['vue', 'axios']
	},

	 output: {
	 	path: path.resolve(__dirname, 'public/js'),
	 	filename: '[name].js', // special sequence that webpack will detect
	 	publicPath: './public'
	 },

	 module: {
	 	rules: [
	 		{
	 			test: /\.js$/,
	 			exclude: /node_modules/,
	 			loader: 'babel-loader'
	 		}
	 	]
	 },

	 resolve: {
	   alias: {
		     'vue$': 'vue/dist/vue.common.js'
		 	}
	   },

	   plugins: [
	   		new webpack.optimize.CommonsChunkPlugin({
	   			names: ['vendor'] // corresponds to the 'vendor' entry point.
	   		})
	   ]
	 };

// Minify project files:
	 if(process.env.NODE_ENV === 'production') {
	 	module.exports.plugins.push(
	 		new webpack.optimize.UglifyJsPlugin({
	 			sourcemap: true,
	 			compress: {
	 				warnings: false
	 			}
	 		})
	 	);

	 	module.exports.plugins.push(
	 		new webpack.DefinePlugin({
	 			'process.env': {
	 				// gets rid of warnings in vue.
	 				NODE_ENV: 'production'
	 			}
	 		})
 		);
	 }

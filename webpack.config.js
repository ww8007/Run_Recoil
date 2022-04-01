const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const TerserJsPlugin = require('terser-webpack-plugin');
module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'build.js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		modules: [path.join(__dirname, 'src'), 'node_modules']
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/preset-react',
						'@babel/preset-typescript'
					],
					plugins: [
						['@babel/plugin-proposal-class-properties', { loose: true }],
						['@babel/plugin-proposal-private-methods', { loose: true }],
						['@babel/plugin-transform-runtime']
					]
				}
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './build/index.html',
			filename: 'index.html'
		})
	],
	optimization: {
		minimizer: [
			new TerserJsPlugin({
				extractComments: false
			})
		]
	}
};

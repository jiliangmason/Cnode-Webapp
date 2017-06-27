let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let OpenBrowserPlugin = require('open-browser-webpack-plugin');

let ROOT_PATH = path.resolve(__dirname, '../');
let ModuleConfig = {};

let EntryConfig = {
	index: path.join(ROOT_PATH, '/src/index.js'),
};

let PluginsConfig = [
	new HtmlWebpackPlugin({
		title: 'Redux-cnode',
		template: path.join(ROOT_PATH, '/src/index.html'),
		filename: 'index.html',
		//chunks这个参数告诉插件要引用entry里面的哪几个入口
		chunks: ['index', 'lib'],
		//要把script插入到标签里
		inject: 'body',
		favicon: path.join(ROOT_PATH, '/src/images/favicon.ico')
	}),
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.UglifyJsPlugin({
		output: {
			comments: false, // remove all comments
		},
		compress: {
			warnings: false
		}
	}),
	new webpack.optimize.CommonsChunkPlugin('lib', '[hash].[name].js'),

	new ExtractTextPlugin('[hash].[name].css'),

	//new webpack.HotModuleReplacementPlugin(),

	new OpenBrowserPlugin({
		url: 'http://localhost:8088'
	}),
];

ModuleConfig.entry = EntryConfig;
ModuleConfig.plugins = PluginsConfig;

module.exports = ModuleConfig;
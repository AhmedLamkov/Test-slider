const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	entry: "./src/index.js",
	mode: "development",
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html",
		}),
	],
};

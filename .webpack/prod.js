const webpack = require('webpack');
const common = require('./common');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        sourceMapFilename: 'map/[name].map'
    }, 
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            minify: true,
            hash: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new BundleAnalyzerPlugin()
    ]
})
const webpack = require('webpack');
const common = require('./common');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            showErrors: true
        }),
        new webpack.NamedModulesPlugin()
    ],
    // performance: {
    //     // maxEntrypointSize: '250000',
    //     hints: 'error',
    //     maxAssetSize: 550000 // 550k
    //     // maxAssetSize: 150000 // 150k
    // },
    // stats: "normal"
})
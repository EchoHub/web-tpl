const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const os = require('os');
const cur_os_name = os.platform();
module.exports = {
    entry: {
        main: path.resolve(__dirname, './../src/app.tsx'),
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, './../dist')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './../src')
        },
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    devServer: {
        contentBase: path.join(__dirname, "./../src/public"),
        compress: true,
        port: 8888,
        host: /^win(32|64)$/.test(cur_os_name) ? 'localhost': '0.0.0.0',
        hot: true,
        before: function (resp) {
            console.log('loader before')
        }
    },
    module: {
        noParse: /lodash/,
        rules: [
            {
                test: /\.tsx?$/,
                use: ['awesome-typescript-loader'],
                exclude: [
                    path.resolve(__dirname, './../node_modules')
                ]
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== 'production' ?
                        'style-loader' : CssExtractPlugin.loader,
                    'css-loader', 'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require("autoprefixer") /*在这里添加*/
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            // mimetype: 'image/png',
                            name: './assets/[name].[hash:8].[ext]',
                            fallback: 'file-loader'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.json$/,
                use: ['json-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].[hash].js'
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    // name: "vendor.min.bundle",
                    name: "vendors.[hash:8].[ext]",
                    chunks: "initial",
                    minChunks: 3,
                    minSize: 0
                },
                base: {
                    test: module => {
                        return /react|redux|prop-types/.test(module.context)
                    },
                    chunks: 'initial',
                    minChunks: 2,
                    name: 'base.[hash:8].[ext]'
                }
            }
        }
    }
}
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HelloWorld = require('./plugins/helloWorld.js');
const PrimusClientWebpackPlugin = require('primus-client-webpack-plugin');

module.exports = {
    resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js']
    },
    module: {
        noParse: /node_modules\/class-name-builder\/dist\/class-name-builder.js/,
        loaders: [{
            test: /\.(js|dist)$/,
            loaders: [
                'babel-loader?presets[]=babel-preset-react,presets[]=babel-preset-es2015,presets[]=babel-preset-stage-2'
            ],
            exclude: /node_modules/
        }]
    },
    entry: {
        app: ['webpack/hot/dev-server', 'babel-polyfill', './src/index.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './favicon.ico'
        }),
        new HelloWorld(),
        new PrimusClientWebpackPlugin({
            filename: 'primus-client.[hash].js',
            primusOptions: {
                transformer: 'sockjs'
            }
        })
    ],
    devServer: {
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: true,
            warnings: false,
            publicPath: false
        }
    }
};
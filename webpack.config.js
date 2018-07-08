const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

const plugins = [new VueLoaderPlugin()];
let { NODE_ENV } = process.env;
NODE_ENV = NODE_ENV.trim();
let STATIC_JSON_DATA_URL = '/data/httpHeaders.json';
let STATIC_APP_LOGO_URL = '/assets/app-logo.svg'
let IS_PROD = false;

if(NODE_ENV === 'production'){
    plugins.push(new BundleAnalyzerPlugin());
    plugins.push(new UglifyJsPlugin());
    plugins.push(new CompressionPlugin);
    STATIC_JSON_DATA_URL = '/fetcher/data/httpHeaders.json';
    STATIC_APP_LOGO_URL = '/fetcher/assets/app-logo.svg'
    IS_PROD = true;
}

plugins.push(new webpack.DefinePlugin({
    STATIC_JSON_DATA_URL: JSON.stringify(STATIC_JSON_DATA_URL),
    STATIC_APP_LOGO_URL: JSON.stringify(STATIC_APP_LOGO_URL),
    IS_PROD: JSON.stringify(IS_PROD)
}));


module.exports = {
    entry: './src/app.js',

    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader'
        },
        {
            test: /\.vue$/,
            use: 'vue-loader'
        },
        {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.scss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },

    plugins: plugins,

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },

    mode: NODE_ENV
};
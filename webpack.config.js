const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const plugins = [new VueLoaderPlugin()];
let STATIC_JSON_DATA_URL = '/data/httpHeaders.json';

if(process.env.mode === 'production'){
    plugins.push(new BundleAnalyzerPlugin());
    plugins.push(new UglifyJsPlugin());
    STATIC_JSON_DATA_URL = '/fetcher/data/httpHeaders.json';
}

plugins.push(new webpack.DefinePlugin({
    STATIC_JSON_DATA_URL: JSON.stringify(STATIC_JSON_DATA_URL)
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
        }]
    },

    plugins: plugins,

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};
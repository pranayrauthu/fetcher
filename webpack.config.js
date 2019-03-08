const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
    const plugins = [new VueLoaderPlugin()];
    let NODE_ENV = argv.mode;
    NODE_ENV = NODE_ENV.trim();
    let STATIC_JSON_DATA_URL = '/data/http-headers.json';
    let STATIC_ICONS_BASE = '/assets/'
    let IS_PROD = false;

    if (NODE_ENV === 'production') {
        plugins.push(new BundleAnalyzerPlugin());
        plugins.push(new UglifyJsPlugin());
        plugins.push(new CompressionPlugin);
        STATIC_JSON_DATA_URL = '/fetcher/data/http-headers.json';
        STATIC_ICONS_BASE = '/fetcher/assets/'
        IS_PROD = true;
    }

    // environment variables
    plugins.push(new webpack.DefinePlugin({
        STATIC_JSON_DATA_URL: JSON.stringify(STATIC_JSON_DATA_URL),
        STATIC_ICONS_BASE: JSON.stringify(STATIC_ICONS_BASE),
        IS_PROD: JSON.stringify(IS_PROD)
    }));

    // copy static files to dist folder
    plugins.push(
        new CopyPlugin([{
            from: './src/static',
            to: path.resolve(__dirname, 'dist')
        }])
    )


    const config = {
        entry: './src/app.js',

        output: {
            filename: '[name].bundle.js',
            chunkFilename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
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

        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },

        mode: NODE_ENV
    };

    if(NODE_ENV === 'devlopment'){
        config.devtool = 'source-map';
    }

    return config;
}
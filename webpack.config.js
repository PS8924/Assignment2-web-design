const path = require('path');
const MiniCSS = require('mini-css-extract-plugin');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/index.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MiniCSS({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new HTMLPlugin({
            template: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    MiniCSS.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }, 
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'data'),
        },
        compress: true,
        port: 9000,
    },
}
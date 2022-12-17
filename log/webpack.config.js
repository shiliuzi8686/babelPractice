const path = require('path');
// const webpack = require('webpack')

module.exports = {
    mode:'development',
    entry: './src/main.js',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    // plugins: [
    //     // fix "process is not defined" error:
    //     // (do "npm install process" before running the build)
    //     new webpack.ProvidePlugin({
    //       process: 'process/browser',
    //     }),
    //   ]    
}

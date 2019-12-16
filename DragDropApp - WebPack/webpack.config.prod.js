const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './app/src/app.ts',
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname+'/dist')
    },
    module:{
        rules: [
            {
                test : /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    // watch: true,
    // performance: {
    //     hints: 'error'
    // },
    stats: {
        env: true,
        logging: 'info',
        hash: true,
        reasons:true,
        timings: true,
        version: true
    },
    devtool: 'none',
    resolve:{
        extensions: ['.js','.ts']
    },
    plugins:[
        new CleanPlugin.CleanWebpackPlugin()
    ]
};
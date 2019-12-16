const path = require('path');

module.exports = {
    entry: './app/src/app.ts',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname+'/dist'),
        publicPath: '/dist/'
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
    devtool: 'inline-source-map',
    resolve:{
        extensions: ['.js','.ts']
    },
};
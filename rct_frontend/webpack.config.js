//import webpack module
const webpack = require("webpack");

//define entry and exit points, i.e. takes in JS files and spits out a bundle
const config = {
    entry: {
        index: __dirname + '/js/index.jsx',
        index2: __dirname + '/js/index2.jsx',
        index3: __dirname + '/js/index3.jsx'},

    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js'
    },
    resolve:{
        extensions: ['.js','.jsx','.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                loader: "file-loader",

                options: {
                    name: "[name].[ext]",
                    outputPath: "../../static/dist",
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    }

};

//export module
module.exports = config;
var webpack = require('webpack');
module.exports = { //注意这里是exports不是export
    entry: {
        core: "./public/js/pages/core.js",
        index: "./public/js/pages/index.js",
        writer: "./public/js/pages/writer.js",
        topic: "./public/js/pages/topic.js",
        login: "./public/js/pages/login.js",
        reg: "./public/js/pages/reg.js",
        list: "./public/js/pages/list.js"
    }, //唯一入口文件，就像Java中的main方法
    output: { //输出目录
        path: __dirname + "/public/dist", //打包后的js文件存放的地方
        filename: '[name].bundle.js' //打包后的js文件名
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]' },
            { test: /\.jsx$/, loader: 'jsx-loader?harmony' }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
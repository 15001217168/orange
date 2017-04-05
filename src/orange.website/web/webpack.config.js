var webpack = require('webpack');
module.exports = { //注意这里是exports不是export
    entry: "./public/js/index.js", //唯一入口文件，就像Java中的main方法
    output: { //输出目录
        path: "./public/dist", //打包后的js文件存放的地方
        filename: "bundle.js" //打包后的js文件名
    }
};
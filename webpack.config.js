const path = require('path');
const webpack = require('webpack');
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const terserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/js/index.js', // 待打包的源代码入口
    output: {
        filename: 'bundle.js', // 打包后的输出名
        publicPath: path.resolve(__dirname, 'dist')
    },
    mode: 'development', // 开发模式
    plugins:[
        // jQuery 对象导出至公共空间
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$':'jquery',
            'window.jQuery':'jquery'
        }),
        // ES6 压缩
        new terserPlugin({
            sourceMap: true
        }),
        // 模块构成分析
        new Analyzer()
    ],
    // 模块抽取
    optimization: {
        splitChunks:{
            chunks: 'all',
            minChunks: 1,
            minSize: 30000
        }
    }
}
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {

    const isDev = argv.mode === 'development'
    const filename = ext => !isDev ? `[name].${ext}` : `[name].[hash].${ext}`
    const plugins = () => {
        const pluginsArr = [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: filename('css'),
            })
        ]

        if(isDev){
            pluginsArr.push(
                new HtmlWebpackPlugin({
                    template: './index.html',
                    minify: {
                        collapseWhitespace: false
                    }
                })
            )
        }
        return pluginsArr
    }

    // CONFIG
    return {
        context: path.resolve(__dirname, 'src'),
        mode: argv.mode,
        entry: {
            countrydropdown: ['@babel/polyfill', './index.js']
        },
        output: {
            filename: filename('js'),
            path: path.resolve(__dirname, 'dist')
        },
        devtool: isDev ? 'source-map' : '',
        devServer: {
            port: 4445,
            //hot: isDev
        },
        plugins: plugins(),
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: isDev,
                                reloadAll: true
                            }
                        },
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        }
    }
}
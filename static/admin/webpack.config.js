const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: __dirname + '/src/app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'admin.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/public/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin({filename: 'style.css'})
    ],
    module: {
        rules: [
            {
                  test: /bootstrap\.native/,
                  use: {
                      loader: 'bootstrap.native-loader',
                      options: {
                          bs_version: 4,
                      }
                  }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader']
                    })
            },
            {
                test: /\.(j|t)sx?$/,
                exclude: [/node_modules/],
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ['babel-preset-expo'],
                        env: {
                            development: {
                                plugins: [
                                    '@babel/plugin-transform-react-jsx-source',
                                ],
                            },
                        },
                    }
                }]
            }
        ]
    },
};

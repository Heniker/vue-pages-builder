/* eslint-disable */
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { getPortPromise } = require('portfinder')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

/**
 * @typedef {object} EnvT
 * @property {boolean} WEBPACK_SERVE
 */

/**
 *
 * @param {EnvT} _
 * @param {{entry: string[], mode: string, env: EnvT}} argv
 */
module.exports = async (_, argv) => {
  const isDev = argv.mode === 'development'
  const isServer = !!argv.env.WEBPACK_SERVE
  const port = isServer ? await getPortPromise({ port: 8080 }) : null
  const htmlTemplate = path.resolve(__dirname, './public/index.html')

  /**
   * @type {import('webpack').Configuration}
   */
  const result = {
    devtool: isDev ? 'source-map' : false,
    resolve: {
      extensions: ['.js', '.vue', '.ts'],
      alias: {
        '@': path.resolve(__dirname, './1/pages'),
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    optimization: {
      removeAvailableModules: true,
      minimize: !isDev,
      minimizer: [
        new TerserPlugin({
          // parallel: true,
          // sourceMap: true,

          terserOptions: {
            parse: {
              ecma: 2020,
            },
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            compress: {
              pure_funcs: ['console.info', 'console.debug', 'console.warn', 'console.log'],
            },

            output: {
              comments: false,
            },
            // warnings: true, // do not even try
            module: true,
            toplevel: true,
            // ecma: 2015,

            mangle: true, // default value?
            // ie8: false, // default value
            // ecma: 5 // default value
          },
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],

      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        // chunks: 'initial',
        chunks: 'all',
        cacheGroups: {
          // carefull with using this as it might actually increase bundle size
          // https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-2
          // https://webpack.js.org/guides/caching/
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
              },
            },
          ],
        },
        {
          test: /\.(woff(2)?|png|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets',
              },
            },
          ],
        },
        {
          test: /\.s(c|a)ss$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDev,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDev,
              },
            },
            'less-loader',
          ],
        },
        {
          test: /\.styl(us)?$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDev,
              },
            },
            'stylus-loader',
          ],
        },
        {
          test: /\.css$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: isDev,
                    modules: {
                      localIdentName: isDev ? '[local]_[hash:base64:5]' : '[hash:base64]',
                    },
                  },
                },
              ],
            },
            {
              use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: isDev,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    devServer: isServer
      ? {
          // contentBase: outputPath,
          compress: true,
          // host: '0.0.0.0',
          historyApiFallback: true,
          hot: true,
          // index: entryPath,
          open: false,
          port,
        }
      : undefined,
    performance: {
      hints: false,
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      }),
      new webpack.ProvidePlugin({
        assert: 'assert',
      }),
      new MiniCssExtractPlugin({
        filename: 'style/[name].[hash].css',
        chunkFilename: 'style/[id].[hash].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new HtmlWebpackPlugin({
        // favicon: 'public/favicon.ico',
        template: htmlTemplate,
      }),
    ],
    node: {
      __filename: true,
    },
    output: {
      filename: 'js/[name].[hash].js',
      clean: true,
      publicPath: '/',
      chunkFilename: 'js/[id].[hash].bundle.js',
      libraryTarget: 'umd',
    },
  }

  return result
}

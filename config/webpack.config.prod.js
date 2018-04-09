const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清空文件夹
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //打包模块分析
const baseWebpackConfig = require('./webpack.config.base');

const prodConfig = merge(baseWebpackConfig, {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[id].[chunkhash:8].js',
  },
  module: {
    rules: [{
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              hmr: false
            },
          },
          use: [{
              loader: 'css-loader',
              options: {
                importLoaders: 1, // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                minimize: true,
                sourceMap: true,
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              hmr: false
            },
          },
          use: [{
              loader: 'css-loader',
              options: {
                importLoaders: 1, // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                minimize: true,
                sourceMap: true,
              }
            },
            'postcss-loader',
            'sass-loader',
          ]
        })
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              hmr: false
            },
          },
          use: [{
              loader: 'css-loader',
              options: {
                importLoaders: 1, // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                minimize: true,
                sourceMap: true,
              }
            },
            'postcss-loader',
            'less-loader',
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'), //根目录　　　　
      verbose: true, //开启在控制台输出信息
      dry: false, //启用删除文件
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true,
      },
      sourceMap: true,
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource && /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'index',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
  ],
});
if (process.env.NODE_ANALYZE) {
  prodConfig.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = prodConfig;

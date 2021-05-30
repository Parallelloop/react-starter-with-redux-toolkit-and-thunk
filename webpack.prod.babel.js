import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import S3Plugin from 'webpack-s3-plugin';
const config = {
  entry: path.resolve(__dirname, './src/index.js'),
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|gif|jpe?g|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(txt|csv|mmdb|xlsx)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              emitFile: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      favicon: './src/assets/icons/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
    //if you wanna use s3 for deployment

    // new S3Plugin({
    //   s3Options: {
    //     accessKeyId: "S3-access-key",
    //     secretAccessKey: "S3-secrete-key",
    //     region: "server region",
    //   },
    //   s3UploadOptions: {
    //     Bucket: "your-bucket-name",
    //     ACL: "",
    //   },
    // }),
  ],
  optimization: {
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: new RegExp(COMMON_REGEX),
    //       name: 'vendor',
    //       chunks: 'all'
    //     }
    //   }
    // },
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
  }
};

export default config;

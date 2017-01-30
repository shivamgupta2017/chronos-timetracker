import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base.js';

export default merge(baseConfig, {
  debug: true,
  devtool: 'eval',
  entry: {
    main: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      'babel-polyfill',
      './src/index',
    ],
    popup: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      './src/popup',
    ],
    idleTimePopup: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      './src/idlePopup',
    ],
  },
  output: {
    publicPath: 'http://localhost:3000/dist',
    filename: '[name]-bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg(\?v=.*)?$|\.otf|\.woff(\?v=.*)?$|\.ttf(\?v=.*)?$|\.eot(\?v=.*)?$|\.woff?2(\?v=.*)?/, // eslint-disable-line max-len
        loader: 'file-loader?name=[path][name].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/mock-firmata/),
    new webpack.ContextReplacementPlugin(/bindings$/, /^$/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.ProvidePlugin({
      Immutable: 'immutable',
    }),
  ],
  target: 'electron-renderer',
});
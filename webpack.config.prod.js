const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './projects/index.html',
      filename: 'projects/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'img' },
        { from: 'css', to: 'css' },
        { from: 'favicon.ico', to: 'favicon.ico', noErrorOnMissing: true },
        { from: 'favicon.svg', to: 'favicon.svg', noErrorOnMissing: true },
        { from: 'android-chrome-192x192.png', to: 'android-chrome-192x192.png', noErrorOnMissing: true },
        { from: 'android-chrome-512x512.png', to: 'android-chrome-512x512.png', noErrorOnMissing: true },
        { from: 'app-icon-512.png', to: 'app-icon-512.png', noErrorOnMissing: true },
        { from: 'app-icon-1024.png', to: 'app-icon-1024.png', noErrorOnMissing: true },
        { from: 'apple-touch-icon.png', to: 'apple-touch-icon.png', noErrorOnMissing: true },
        { from: 'browserconfig.xml', to: 'browserconfig.xml', noErrorOnMissing: true },
        { from: 'favicon-16x16.png', to: 'favicon-16x16.png', noErrorOnMissing: true },
        { from: 'favicon-32x32.png', to: 'favicon-32x32.png', noErrorOnMissing: true },
        { from: 'favicon-48x48.png', to: 'favicon-48x48.png', noErrorOnMissing: true },
        { from: 'icon-maskable-192.png', to: 'icon-maskable-192.png', noErrorOnMissing: true },
        { from: 'icon-maskable-512.png', to: 'icon-maskable-512.png', noErrorOnMissing: true },
        { from: 'mstile-150x150.png', to: 'mstile-150x150.png', noErrorOnMissing: true },
        { from: 'og-image.png', to: 'og-image.png', noErrorOnMissing: true },
        { from: 'twitter-image.png', to: 'twitter-image.png', noErrorOnMissing: true },
        { from: 'robots.txt', to: 'robots.txt', noErrorOnMissing: true },
        { from: '404.html', to: '404.html', noErrorOnMissing: true },
        { from: 'site.webmanifest', to: 'site.webmanifest', noErrorOnMissing: true },
      ],
    }),
  ],
});

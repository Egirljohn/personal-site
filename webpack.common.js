const path = require('path');

module.exports = {
  entry: {
    app: './js/app.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/app.js',
  },

  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        type: 'asset/source',
      },
    ],
  },
};

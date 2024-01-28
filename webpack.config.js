const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  // ... outras configurações ...

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // Configurações específicas do Terser aqui, se necessário
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          // Configurações específicas do otimizador CSS aqui, se necessário
        },
      }),
    ],
  },

  module: {
    rules: [
      // ... outras regras de carregamento de arquivos, como regras para Vue e imagens ...
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader', // Se você estiver usando PostCSS
        ],
      },
    ],
  },
};

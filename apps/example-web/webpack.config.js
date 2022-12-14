const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (config) => {
  const cssRule = config.module.rules.find((rule) =>
    rule.test.toString().includes('css')
  );

  const rulesWithoutCss = config.module.rules.filter(
    (rule) => !rule.test.toString().includes('css')
  );

  const postCssLoaderConfig = cssRule.oneOf[0].use.find((loaderConfig) =>
    loaderConfig.loader.includes('postcss-loader')
  );

  const rules = [
    ...rulesWithoutCss,
    {
      ...cssRule,
      oneOf: [
        {
          test: /\.vanilla\.css$/i, // Targets only CSS files generated by vanilla-extract
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                url: false, // Required as image imports should be handled via JS/TS import statements
              },
            },
            postCssLoaderConfig,
          ],
        },
        ...cssRule.oneOf,
      ],
    },
  ];

  return {
    ...config,
    plugins: [...config.plugins, new VanillaExtractPlugin()],
    module: {
      ...config.module,
      rules,
    },
  };
};

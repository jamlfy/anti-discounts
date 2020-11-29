/* eslint-disable import/no-unresolved */
const packageData = require('./package.json');

module.exports = {
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    config
      .entry('background')
        .add('./src/background.js')
        .end()
      // Modify output settings
      .output
        .filename('js/[name].bundle.js');

    config
      .plugin('define')
      .tap(([options = {}]) => [{
      ...options,
      // these are the env variables from your .env file, if any arr defined
      VERSION: JSON.stringify(packageData.version),
      EXTENSION: "(navigator.vendor === 'Google Inc.' ? chrome : browser )",
      IS_CHROME: "navigator.vendor === 'Google Inc.'",
    }]);

      config.plugin('copy')
          .tap(args => {
            console.log('copy',args);
            return args
          })

    return config;
  },
};

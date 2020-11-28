

module.exports = {
	chainWebpack: config => {
    const package = require('./package.json');
    config.plugin('define').tap( ([options = {}]) => {
      return [{
        ...options, // these are the env variables from your .env file, if any arr defined
        VERSION: JSON.stringify(package.version),
        EXTENSION : `(navigator.vendor === 'Google Inc.' ? chrome : browser )`,
        IS_CHROME: `navigator.vendor === 'Google Inc.'`
      }]
    })
  }
}
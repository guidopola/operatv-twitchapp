var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var appConfig = require('./appconfig')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APP_PLAYLIST_EXTRACTOR_URL: appConfig.APP_DEV_PLAYLIST_EXTRACTOR_URL
})

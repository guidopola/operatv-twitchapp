var appConfig = require('./appconfig')

module.exports = {
  NODE_ENV: '"production"',
  APP_TWITCH_CLIENT_ID: appConfig.APP_TWITCH_CLIENT_ID,
  APP_PLAYLIST_EXTRACTOR_URL: appConfig.APP_PROD_PLAYLIST_EXTRACTOR_URL
}

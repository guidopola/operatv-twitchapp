// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import 'es6-promise/auto';
import numeral from 'numeral';
import 'numeral/locales/es';

import App from './App';
import router from './router';

Vue.use(Router, axios);

Vue.config.productionTip = false;
// process.env.APP_TWITCH_CLIENT_ID
// process.env.APP_PLAYLIST_EXTRACTOR_URL

//
window.eventHub = new Vue();

//
window.axiosConfig = {
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': process.env.APP_TWITCH_CLIENT_ID,
  },
};
window.VK_INFO = window.VK_INFO || 73; // i
Vue.config.keyCodes.buttonInfo = window.VK_INFO || 73;

Vue.filter('format-number', (value) => {
  numeral.locale('es');
  return numeral(value).format('0,0');
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

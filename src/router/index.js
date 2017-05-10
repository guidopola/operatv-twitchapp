import Router from 'vue-router';
import Home from '@/components/Home';
import StreamList from '@/components/StreamList';
import ViewStream from '@/components/ViewStream';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        window.eventHub.$emit('showLoaderOverlay');
        next();
      },
    },
    {
      path: '/game/:gameName',
      name: 'StreamList',
      component: StreamList,
      props: true,
      beforeEnter: (to, from, next) => {
        window.eventHub.$emit('showLoaderOverlay');
        next();
      },
    },
    {
      path: '/view/:channelName',
      name: 'ViewStream',
      component: ViewStream,
      props: true,
      beforeEnter: (to, from, next) => {
        window.eventHub.$emit('showLoaderOverlay');
        next();
      },
    },
  ],
});

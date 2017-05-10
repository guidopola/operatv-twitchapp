<template>
  <div id="app">
    <preloader :show="loading"></preloader>
    <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import Preloader from './components/Preloader';

export default {
  name: 'app',
  components: { Preloader },
  data() {
    return {
      loading: true,
    };
  },

  created() {
    window.eventHub.$on('toggleLoaderOverlay', () => {
      this.loading = !this.loading;
    });
    window.eventHub.$on('showLoaderOverlay', () => {
      this.loading = true;
    });
    window.eventHub.$on('hideLoaderOverlay', () => {
      this.loading = false;
    });

    // this.getGameList();

    // this.getGameList();
  },
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>

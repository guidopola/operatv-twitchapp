<template>
  <div class="container wrapper">
    <div class="game-list row list-group">
      <div v-if="gameListLoaded">
        <game-list-item v-for="(item, index) in gameList" :gamedata="item" :index="index" :key="index"></game-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import numeral from 'numeral'
// import storage from '../storage.js'
import GameListItem from './GameListItem';

export default {
  name: 'game-list',
  components: { GameListItem },
  data() {
    return {
      listTitle: '',
      gameList: [],
      /* pages: '',
      results: '',
      currentPage: 1,*/
      gameListLoaded: false,
    };
  },
  methods: {
    fetchGameList() {
      axios.get('https://api.twitch.tv/kraken/games/top?offset=0&limit=24', window.axiosConfig).then((response) => {
        this.gameList = response.data.top;

        // document.getElementById('test_output').innerHTML = JSON.stringify(response.data);
        //
        this.gameListLoaded = true;

        // hide loading overlay.
        window.eventHub.$emit('hideLoaderOverlay');
      })
      .catch(() => {
        this.$router.push({ name: '404' });
      });
    },
  },

  created() {
    //
    this.fetchGameList();

    //
    console.log(process.env);
  },
};
</script>

<style>
div.game-list {
  overflow: hidden;
}
</style>

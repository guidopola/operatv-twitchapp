<template>
  <div class="container wrapper">
    {{ gameName }}
      
    <div class="game-list row list-group">
      <div v-if="streamListLoaded">
        <stream-list-item v-for="(item, index) in streamList" :streaminfo="item" :index="index" :key="index"></stream-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import StreamListItem from './StreamListItem';

export default {
  props: ['gameName'],
  components: { StreamListItem },
  data() {
    return {
      listTitle: '',
      streamList: [],
      streamListLoaded: false,
    };
  },

  methods: {
    fetchStreamList() {
      axios.get(`https://api.twitch.tv/kraken/streams?game=${this.gameName}&limit=16`, window.axiosConfig).then((response) => {
        this.streamList = response.data.streams;
        //
        this.streamListLoaded = true;
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
    this.fetchStreamList();
  },

};
</script>


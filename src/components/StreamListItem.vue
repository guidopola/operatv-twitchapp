<template>
  <div class="stream-item col-lg-3 grid-group-item" :tabindex="getTabIndex" v-on:click="openStream">
    <div class="card">
      <div class="card-image">
          <img :src="streaminfo.preview.medium" />
      </div>
      <div class="stream-item-info">
        <h4 class="title text-elipsis">{{ streaminfo.channel.status }}</h4>
        <p class="viewers text-elipsis">{{ streaminfo.viewers | format-number }} espectadores en {{ streaminfo.channel.display_name }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'stream-list-item',
  props: ['streaminfo', 'index'],
  computed: {
    getTabIndex() {
      return this.index + 1;
    },
  },
  methods: {
    openStream() {
      // named route
      this.$router.push({
        name: 'ViewStream',
        params: { initialStreamInfo: this.streaminfo, channelName: this.streaminfo.channel.name },
      });
    },
  },
  mounted() {
    if (this.index === 0) {
      this.$el.focus();
    }
  },
};
</script>

<style scoped>
.stream-item {
  margin-bottom: 20px;
  outline: none;
}

.stream-item:focus .card {
  /*border: 1px solid #6441a4;
  box-shadow: 0 2px 4px 0 rgba(100,65,164, .12), 0 0 6px 0 rgba(100,65,164,.04);*/
    border: 1px solid rgba(100, 65, 164, 0.8);
    box-shadow: 0 2px 4px 0 rgba(100, 65, 164, 0.78), 0 0 2px 0 rgba(100, 65, 164, 0.78);

    background-color: #6441a4;
    color:white;
}

img {
  width: 320px;
  height: 180px;
}



.card {
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0,0,0, .12), 0 0 6px 0 rgba(0,0,0,.04);
}

.stream-item-info {
  padding: 0 10px;
}

h4.title {
  font-size:16px;
  clear:both;
}

p.viewers { padding: 0; font-size: 13px; }

.text-elipsis {
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden !important;
  display: block;
  white-space: nowrap;
}

</style>

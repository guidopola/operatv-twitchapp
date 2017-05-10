<template>
  <div class="game-item col-lg-3 grid-group-item" :tabindex="getTabIndex" v-on:click="openSelectedGame">
    <div class="card">
      <div class="card-image">
          <img class="game-boxart" :src="gamedata.game.box.large" />
      </div>
      <div class="game-item-info">
        <h4 class="title text-elipsis">{{ gamedata.game.name }}</h4>
        <p class="viewers text-elipsis">{{ this.gamedata.viewers | format-number }} espectadores</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'game-list-item',
  props: ['gamedata', 'index'],
  computed: {
    getTabIndex() {
      return this.index + 1;
    },
  },
  methods: {
    openSelectedGame() {
      // named route
      this.$router.push({
        name: 'StreamList',
        params: { gameName: this.gamedata.game.name },
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
.game-item {
  margin-bottom: 20px;
  outline: none;
  text-align: center;
}

.game-item:focus .card {
  /*border: 1px solid #6441a4;
  box-shadow: 0 2px 4px 0 rgba(100,65,164, .12), 0 0 6px 0 rgba(100,65,164,.04);*/
    border: 1px solid rgba(100, 65, 164, 0.8);
    box-shadow: 0 2px 4px 0 rgba(100, 65, 164, 0.78), 0 0 2px 0 rgba(100, 65, 164, 0.78);

    background-color: #6441a4;
    color:white;
}

img.game-boxart {
  width: 272px;
  height: 380px;
  background: url('data:image/jpeg;base64,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');
}



.card {
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0,0,0, .12), 0 0 6px 0 rgba(0,0,0,.04);
}

h4.title {
  padding: 0 10px;
}

p.viewers {}

.text-elipsis {
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  white-space: nowrap;
}

</style>

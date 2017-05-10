<template>
  <div class="overlay" v-show="show">
    <img class="logo" src="../assets/twitch_logo_white.png">
    <div class="spinner">
      <img src="../assets/loader_spinner.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  props: {
    show: {
      default: true,
    },
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.overlay:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #6441A4;
}

.overlay img.logo {
    position: relative;
    width: 600px;
    height: 200px;
    left: -300px;
    top: -200px;
}
.spinner
{
  width: 500px;
  left: -100px;
  top: 50px;
  position: absolute;
}

svg {
  position: absolute;
}
</style>


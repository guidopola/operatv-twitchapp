<template>
  <div class="wrapper"> <!--  @keydown.enter="toggleInfoOverlay" tabindex="-1" -->
    <div class="info-overlay container" v-show="showInfoOverlay">
      <div class="row">
        <div class="col-lg-2">
          <img :src="streamInfo.channel.logo">
        </div>
        <div class="col-lg-10">
          <h2>{{ streamInfo.channel.status }}</h2>
          <h3>{{ streamInfo.channel.display_name }}</h3>
          <div class="row channelinfo">
            <div class="col-lg-2">
              <div class="livecount">
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" x="0px" y="0px" viewBox="0 0 16 16">
                  <path d="M9 11.041v-0.825c1.102-0.621 2-2.168 2-3.716 0-2.485 0-4.5-3-4.5s-3 2.015-3 4.5c0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h14c0-2.015-2.608-3.682-6-3.959z"></path>
                </svg>
                {{ streamInfo.viewers | format-number }}
              </div>
            </div>
            <div class="col-lg-3">
              <div class="viewcount">
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" x="0px" y="0px" viewBox="0 0 16 16">
                  <path d="M8 3c-3.489 0-6.514 2.032-8 5 1.486 2.968 4.511 5 8 5s6.514-2.032 8-5c-1.486-2.968-4.511-5-8-5zM11.945 5.652c0.94 0.6 1.737 1.403 2.335 2.348-0.598 0.946-1.395 1.749-2.335 2.348-1.181 0.753-2.545 1.152-3.944 1.152s-2.763-0.398-3.945-1.152c-0.94-0.6-1.737-1.403-2.335-2.348 0.598-0.946 1.395-1.749 2.335-2.348 0.061-0.039 0.123-0.077 0.185-0.114-0.156 0.427-0.241 0.888-0.241 1.369 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.481-0.085-0.942-0.241-1.369 0.062 0.037 0.124 0.075 0.185 0.114v0zM8 6.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5 0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5z"></path>
                </svg>
                {{ streamInfo.channel.views | format-number }}
              </div>
            </div>
            <div class="col-lg-2">
              <div class="resolution" tabindex="1">
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" x="0px" y="0px" viewBox="0 0 16 16">
                  <path d="M0 2v12h16v-12h-16zM3 13h-2v-2h2v2zM3 9h-2v-2h2v2zM3 5h-2v-2h2v2zM12 13h-8v-10h8v10zM15 13h-2v-2h2v2zM15 9h-2v-2h2v2zM15 5h-2v-2h2v2zM6 5v6l4-3z"></path>
                </svg>
                1920 x 1080
              </div>
            </div>
            <div class="col-lg-2">
              <div v-if="isFavorite" class="favorite active" tabindex="2">
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" x="0px" y="0px" viewBox="0 0 16 16">
                  <path d="M16 6.204l-5.528-0.803-2.472-5.009-2.472 5.009-5.528 0.803 4 3.899-0.944 5.505 4.944-2.599 4.944 2.599-0.944-5.505 4-3.899z"></path>
                </svg>
                ¡En favoritos!
              </div>
              <div class="favorite" tabindex="2" v-else>
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" x="0px" y="0px" viewBox="0 0 16 16">
                  <path d="M16 6.204l-5.528-0.803-2.472-5.009-2.472 5.009-5.528 0.803 4 3.899-0.944 5.505 4.944-2.599 4.944 2.599-0.944-5.505 4-3.899zM8 11.773l-3.492 1.836 0.667-3.888-2.825-2.753 3.904-0.567 1.746-3.537 1.746 3.537 3.904 0.567-2.825 2.753 0.667 3.888-3.492-1.836z"></path>
                </svg>
                ¡Agregar a favoritos!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="video-container">
      <!-- video with :width="windowWidth" :height="windowHeight" doesn't work for some reason -->
      <video id="player" autoplay :width="windowWidth" :height="windowHeight">
        <template v-if="mediaPlaylistLoaded">
          <template v-if="runningInTV">
            <source type="application/vnd.apple.mpegurl" :src="streamUrl" :width="windowWidth" :height="windowHeight">
          </template>
        </template>
      </video>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import HlsJS from 'hls.js';
import ParseTwitchM3U8 from '../twitch_m3u8';

export default {
  props: ['initialStreamInfo', 'channelName'],

  data() {
    return {
      streamInfo: [],
      accessToken: {},
      mediaPlaylist: [],
      mediaPlaylistLoaded: false,
      videoElement: [],
      videoPlaying: false,
      hls: [],
      showInfoOverlay: false,
    };
  },
  computed: {
    isFavorite() {
      return true;
    },
    streamUrl() {
      return this.mediaPlaylist.chunked.url;
    },
    debugInfo() {
      return 'test';
    },
    windowWidth() {
      return `${window.innerWidth}px`;
    },
    windowHeight() {
      return `${window.innerHeight}px`;
    },

    //
    streamTitle() {
      return 'bla';
    },
  },
  methods: {
    toggleInfoOverlay() {
      console.log('toggleInfoOverlay');
      this.showInfoOverlay = !this.showInfoOverlay;
    },
    runningInTV() {
      const ua = navigator.userAgent;
      if (ua.indexOf('Model/Opera-TvEmulator') !== -1
        || ua.indexOf('Model/Opera-Webkit') !== -1
        || ua.indexOf('Opera TV Store') !== -1) {
        return true;
      }
      return false;
    },
    updateStreamInfo() {
      console.log('updating streamInfo');

      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
      axios.get(`https://api.twitch.tv/kraken/streams/${this.streamInfo.channel._id}`, window.axiosConfig).then((response) => {
        this.streamInfo = response.data.stream;

        // Update every 2 minutes
        setTimeout(this.updateStreamInfo, 1000 * 60 * 2);
      });
    },
    fetchStreamPlaylist() {
      axios.get(`${process.env.APP_PLAYLIST_EXTRACTOR_URL}/?channel=${this.streamInfo.channel.name}`).then((response) => {
        //
        this.mediaPlaylist = ParseTwitchM3U8(response.data);

        //
        this.mediaPlaylistLoaded = true;
        console.log(this.mediaPlaylist);

        this.videoElement = document.getElementById('player');

        this.videoElement.addEventListener('loadeddata', () => {
          window.eventHub.$emit('hideLoaderOverlay');
        });

        // Just a fallback for dev in browser.
        if (!this.runningInTV()) {
          this.hls = new HlsJS();
          this.hls.loadSource(this.mediaPlaylist.chunked.url);
          this.hls.attachMedia(this.videoElement);
          this.hls.on(HlsJS.Events.MANIFEST_PARSED, () => {
            this.videoElement.play();
          });
        }

        //
        // this.videoElement.src = this.mediaPlaylist.chunked.url;
        //
        // hide loading overlay.
        // window.eventHub.$emit('hideLoaderOverlay');
      })
      .catch(() => {
        this.$router.push({ name: '404' });
      });
    },
  },

  created() {
    this.streamInfo = this.initialStreamInfo;
    console.log(this.streamInfo);
    this.fetchStreamPlaylist();

    //
    this.updateStreamInfo();
    //
    // this.fetchStreamPlaylist();
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === window.VK_INFO) {
        this.toggleInfoOverlay();
      }
      console.log(e.keyCode);
    });
  },
  beforeMounted() {
    //
    this.videoElement.style.width = this.windowWidth();
    this.videoElement.style.height = this.windowHeight();
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
}

h2 {
  color: white;
  font-weight: bold;
  height: 60px;
}

h3 {
  color: white;
}

.info-overlay {
  color: white;
  width: 100%;
  height: 26%;
  position: absolute;
  z-index: 998;
  background: rgba(0, 0, 0, .8);
  -o-text-overflow: ellipsis;
  overflow: hidden;
}

.info-overlay svg {
  display: inline;
  vertical-align: middle;
  margin-top: -2px;
  fill: white;
}

.info-overlay img {
  height: 100%;
  width: 100%;
  padding: 10%;
}

.channelinfo {
  margin-top: 2%;
}

.channelinfo div.col-lg-1 div,
.channelinfo div.col-lg-2 div,
.channelinfo div.col-lg-3 div,
.channelinfo div.col-lg-4 div,
.channelinfo div.col-lg-5 div,
.channelinfo div.col-lg-6 div
{
    padding: 4px 10px;
}

.channelinfo:first-child {
  padding-left: 0px;
}

.settings {
    margin-top: 5%;
}

.livecount {
  color: #fc3636;
}

.livecount svg {
  fill: #fc3636;
}

.channelinfo  div:focus {
  background: #4b367c;
  outline:none;
}


.favorite .active {
  color: #fc3636;
}

.favorite .active svg {
  fill: #fc3636;
}


.video-container {
  position:absolute;
  height:100%;
  width:100%;
  overflow: hidden;
}
video {
  min-width: 100%;
  min-height: 100%;
  object-fit: fill;
}
</style>


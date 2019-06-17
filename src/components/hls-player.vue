<template>
  <div class="hls-plyr-player">
    <vue-plyr
      ref="plyr"
      class="player-wrapper"
      :options="options"
    >
      <video
        preload="none"
        ref="video"
      ></video>
    </vue-plyr>
  </div>
</template>

<script>
import Hls from 'hls.js';

export default {
  name: 'HlsPlayer',
  props: {
    source: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hls: null,
      options: {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'captions',
          'settings',
          'airplay',
          'fullscreen',
        ],
      },
    };
  },
  computed: {
    player() {
      return this.$refs.plyr.player;
    },
    video() {
      return this.$refs.video;
    },
  },
  watch: {
    source() {
      if (!Hls.isSupported()) {
        this.video.src = this.source;
      } else {
        const hls = new Hls();
        this.hls = hls;
        hls.loadSource(this.source);
        hls.attachMedia(this.video);
        this.$once('hook:beforeDestroy', () => {
          hls.stopLoad();
          hls.destroy();
        });
      }
    },
  },
};
</script>

<style lang="scss">
.hls-plyr-player {
  width: 100%;
  height: 100%;
  .player-wrapper {
    width: 100%;
    height: 100%;

    .plyr {
      height: 100%;
    }

    .plyr__video-wrapper {
      height: 100%;
      video {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
}
</style>

<template>
  <div class="home">
    <hls-player source='http://video2.caomin5168.com:8091/20190612/FDbHTUL7/index.m3u8'></hls-player>
  </div>
</template>

<script>
// @ is an alias to /src
import got from 'got';
import util from 'util';
import { parseString } from 'xml2js';

import HlsPlayer from '@/components/hls-player';

const parseStringSync = util.promisify(parseString);

export default {
  name: 'home',
  components: {
    HlsPlayer,
  },
  mounted() {
    got('http://f2dcj6.com/api', {
      query: {
        ac: 'videolist',
      },
      decompress: false,
      // useElectronNet: true,
    }).then((res) => {
      console.log(res.body);
      return parseStringSync(res.body, { explicitArray: false });
    }).then((data) => {
      console.log(data);
    });
  },
};
</script>

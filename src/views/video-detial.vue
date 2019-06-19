 <template>
  <div class="video-detial container">
    <div
      class="pageloader"
      :class="{
       'is-active': loading
    }"
    >
      <span class="title">正在努力加载视频信息</span>
    </div>
    <div class="section">
      <nav
        class="breadcrumb"
        aria-label="breadcrumbs"
      >
        <ul>
          <li>
            <a @click="$router.go(-1)">视频列表</a>
          </li>
          <li class="is-active">
            <a
              href="#"
              aria-current="page"
            >{{videoInfo.name}}</a>
          </li>
        </ul>
      </nav>
    </div>
    <section class="section">
      <div class="video-warp">
        <hls-player :source="videoInfo.dl.dd._"></hls-player>
      </div>
    </section>
    <section class="section">
      <div class="field is-grouped">
        <div class="control">
          <button class="button" @click="copyVideoMeta">复制下载信息</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import got from 'got';
import util from 'util';
import path from 'path';
import { parseString } from 'xml2js';
import { clipboard } from 'electron';
import HlsPlayer from '@/components/hls-player';

const parseStringSync = util.promisify(parseString);

export default {
  name: 'VideoDetial',
  props: {
    videoId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      videoInfo: {
        last: '',
        id: '',
        tid: '',
        name: '',
        type: '',
        pic: '',
        lang: '',
        area: '',
        year: '',
        state: '',
        note: '',
        actor: '',
        director: '',
        dl: {
          dd: {
            _: '',
            $: { flag: 'ckplayer' },
          },
        },
        des: '',
      },
    };
  },
  components: {
    HlsPlayer,
  },
  mounted() {
    this.getVideoInfo();
  },
  methods: {
    getVideoInfo() {
      this.loading = true;
      got('http://f2dcj6.com/api', {
        query: {
          ac: 'videolist',
          ids: this.videoId,
        },
        decompress: false,
      })
        .then(res => parseStringSync(res.body, { explicitArray: false }))
        .then((data) => {
          this.videoInfo = data.rss.list.video;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    copyVideoMeta() {
      const dirName = path.parse(this.videoInfo.name).name;
      clipboard.writeText(`name: ${dirName}\nuri: ${this.videoInfo.dl.dd._}`);
    },
  },
};
</script>

<style lang="scss">
.video-warp {
  height: calc(100vh - 257px);
}
</style>

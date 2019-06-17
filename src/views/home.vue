<template>
  <div class="home container">
    <div
      class="pageloader"
      :class="{
       'is-active': loading
    }"
    >
      <span class="title">正在努力加载视频信息</span>
    </div>
    <div class="vido-list section">
      <router-link
        v-for="video in videoList"
        :key="video.id"
        :to="{ name: 'VideoDetail', params: { videoId: video.id }}"
      >
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <img
                :src="video.pic"
                alt="预览图片"
              >
            </figure>
          </div>
          <div class="card-content">
            <p class="title is-6 name">{{video.name}}</p>
            <div class="content">
              <div class="info">
                <time :datetime="video.last">{{ video.last }}</time>
                <div>{{ video.type }}</div>
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="section pagination">
      <pagination
        v-model="pagination.page"
        :records="pagination.total"
        :per-page="20"
        :options="{
          theme:'bulma'
        }"
        @paginate="onPageChange"
      ></pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import got from 'got';
import util from 'util';
import { parseString } from 'xml2js';
import Pagination from 'vue-pagination-2';
import _toInteger from 'lodash/toInteger';

const parseStringSync = util.promisify(parseString);

export default {
  name: 'home',
  data() {
    return {
      loading: true,
      videoList: [],
      pagination: {
        page: 1,
        total: 0,
      },
    };
  },
  components: {
    Pagination,
  },
  mounted() {
    this.getVideoList(1);
  },
  methods: {
    getVideoList(page) {
      this.loading = true;
      got('http://f2dcj6.com/api', {
        query: {
          ac: 'videolist',
          pg: page,
        },
        decompress: false,
      })
        .then(res => parseStringSync(res.body, { explicitArray: false }))
        .then((data) => {
          this.videoList = data.rss.list.video;
          this.pagination.total = _toInteger(data.rss.list.$.recordcount);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onPageChange(event) {
      this.getVideoList(event);
    },
  },
};
</script>

<style lang="scss">
.home {
  .vido-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 290px);
    grid-gap: 20px;
    justify-content: center;
    a {
      text-decoration: none;
      color: #606266;
    }
    .name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .info {
      display: flex;
      justify-content: space-between;
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
  }
}
</style>

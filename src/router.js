import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home.vue';
import VideoDetail from '@/views/video-detial.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/video-detail/:videoId',
      name: 'VideoDetail',
      props: true,
      component: VideoDetail,
    },
  ],
});

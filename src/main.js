import Vue from 'vue';
import VuePlyr from 'vue-plyr';
import App from './App.vue';
import router from './router';
import 'normalize.css';
import '@/style/index.scss';
import 'vue-plyr/dist/vue-plyr.css';

Vue.config.productionTip = false;

Vue.use(VuePlyr);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

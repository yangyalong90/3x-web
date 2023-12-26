import Vue from 'vue'
import App from './App.vue'

import './assets/main.css'
import request from './utils/request.js';

// 绑定 http 组件
Vue.prototype.$http = request;

// element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// router
import VueRouter from 'vue-router';
import router from './routes/indes.js';
Vue.use(VueRouter);

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app')

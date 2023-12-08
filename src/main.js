import Vue from 'vue'
import App from './App.vue'

import './assets/main.css'

import request from './utils/request';

// 绑定 http 组件
Vue.prototype.$http = request;

new Vue({
  render: (h) => h(App)
}).$mount('#app')

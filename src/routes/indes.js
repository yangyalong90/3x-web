import VueRouter from 'vue-router';

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { 
    path: '/suo/fund', 
    component: () => import('../views/suo/fund-check-record.vue'),
  },
  {
    path: '/suo/fund/detail', 
    component: () => import('../views/suo/fund-check-detail.vue'),
  }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})


export default router;
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home" },
  { path: "/404", name: "404", component: () => import("@/views/404.vue") },
  { path: "/401", name: "401", component: () => import("@/views/401.vue") },
  { path: "/login", name: "login", component: () => import("@/views/login.vue")}
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

// router.beforeEach(async (to,from,next) => {
//   // 判断是否登录
//   if (true) {
//     //1、已登录
//     if (to.path === '/login') {
//       next({path: "/"})
//     } else {
//       await store.dispatch("GetUserInfo")
//       await store.dispatch("getRoutes")
//       /** 添加动态路由 */
//       router.addRoute(store.getters.routers)
//     }
//   }
// })
export default router;
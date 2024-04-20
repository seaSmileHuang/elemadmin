import store from "@/store";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home" },
  {path: "/home", name: "home", component: () => import("@/views/home.vue")},
  { path: "/404", name: "404", component: () => import("@/views/404.vue") },
  { path: "/401", name: "401", component: () => import("@/views/401.vue") },
  { path: "/login", name: "login", component: () => import("@/views/login.vue")}
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

router.beforeEach(async (to,from,next) => {
  // 判断是否登录
  if (true) {
    //1、已登录
    if (to.path === '/login') {
      next({path: "/"})
    } else {
      // await store.dispatch("GetUserInfo")
      await store.dispatch("getRoutes")
      /** 添加动态路由 */
      console.log("store.getters.routers", store.getters.routes)
      router.addRoute((store.getters.routes || []).concat({
        path: "*",
        redirect: "/404"
      }))
      console.log("router", router.getRoutes())
      next()
    }
  }
})
export default router;
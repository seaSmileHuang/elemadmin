import store from "@/store";
import { addRoutes } from "@/store/modules/permission";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home" },
  {path: "/home", name: "home", component: () => import("@/views/home.vue"), meta: {
    title: "首页"
  }},
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
  const isLogin = true
  if (isLogin) {
    //1、已登录
    if (to.path === '/login') {
      next({path: "/"})
    } else {
      if (store.getters.routes?.length) {
        next()
      } else {
        // await store.dispatch("GetUserInfo")
        await store.dispatch("getRoutes")
        /** 添加动态路由 */
        console.log("store.getters.routers", store.getters.routes)
        addRoutes((store.getters.routes || []).concat({
          path: "/:pathMatch(.*)",
          redirect: "/404"
        }))
        console.log("router", router.getRoutes())

        next({...to, replace: true})
      }

    }
  } else {
    //未登录
    if (to.path === "/login") {
      next()
    } else {
      next({path: `/login?redirect=${to.path}`,replace: true})
    }
  }
})
export default router;
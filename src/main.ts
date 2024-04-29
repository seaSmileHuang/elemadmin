import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"

// global css
import "@/assets/styles/element/index.scss"
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/styles/index.scss'
import './style.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(store)
// app.use(ElementPlus)
app.mount('#app')

app.directive("permission", {
	mounted(el, binding) {
		const permissionValue = binding.value
    const hasPermission = (store.getters.roles || []).includes(permissionValue)
    if (!hasPermission && !store.getters.roles.includes("admin")) {
      el.parentNode && el.parentNode.removeChild(el)
    }
	}
})
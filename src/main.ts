// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// global css
import './assets/styles/index.scss'

const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(ElementPlus)
app.mount('#app')

// Vue.withDirectives("permission", {
// 	inserted(el, binding) {
// 		const permissionValue = binding.value
// 	}
// })
import { createStore } from 'vuex'
import app from "./modules/app"
import permission from './modules/permission'
import user from "./modules/user"
// 创建一个新的 store 实例

const store = createStore({
  state () {
    return {
      
    }
  },
  getters: {
    user: (state) => {
      return state.user.user
    },
    routes: (state) => {
      return state.permission.routers
    },
    sidebar: (state) => {
      return state.app.sidebar
    }
  },
  mutations: {
  },
  modules: {
    user,
    permission,
    app
  }
})

export default store
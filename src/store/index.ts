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
    roles: (state) => {
      return state.user.roles
    },
    routes: (state) => {
      console.log("state11", state)
      return state.permission.routes
    },
    sidebar: (state) => {
      return state.app.sidebar
    },
    tagViews: (state) => {
      return state.app.tagViews
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
import { createStore } from 'vuex'
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
    }
  },
  mutations: {
  },
  modules: {
    user,
    permission
  }
})

export default store
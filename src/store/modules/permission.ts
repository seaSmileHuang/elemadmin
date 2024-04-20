import MenuApi, { IMenuItem } from "@/api/menu"
import { asyncify } from "@/utils/extractData"
import { RouteRecordRaw } from "vue-router"
import { Commit } from "vuex"
import Layout from "@/views/Layout/index.vue"

type State = {
	routes: Array<RouteRecordRaw>
}
const permission = {
	state: {
		routes: []
	} as State,
	getters: {
	
	},
	mutations: {
		SET_ROUTERS(state:State, routes: Array<RouteRecordRaw>) {
			state.routes = routes
		}
	},
	actions: {
		getRoutes: async ({commit}: {commit: Commit}) => {
			const res = await asyncify(() => MenuApi.getUserMenus())()
			commit("SET_ROUTERS", filterAsyncRouter(res))
		}
	}
}

export default permission
const filterAsyncRouter = (menus: IMenuItem[]): Array<RouteRecordRaw> => {
	return menus.map((menu) => {
		return {
			path: menu.path,
			name: menu.title,
			component: menu.component ? lazyComponent(menu.component): Layout,
			children: filterAsyncRouter(menu.children || [])
		}
	})
}

const lazyComponent = (path: string) => () => import(`@/views${path}/index.vue`).then((res) => res.default)
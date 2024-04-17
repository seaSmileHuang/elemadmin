import MenuApi, { IMenuItem } from "@/api/menu"
import { asyncify } from "@/utils/extractData"
import { RouteRecordRaw } from "vue-router"
import { Commit } from "vuex"

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
const filterAsyncRouter = (menus: IMenuItem[])  => {
	menus.map((menu) => ({
		path: menu.path,
		name: menu.title,
		component: menu.component ? lazyComponent(menu.component) : undefined,
		children: filterAsyncRouter(menu.children || [])
	}))
}

const lazyComponent = (path: string) => import(`@/views/${path}`).then((res) => res.default)
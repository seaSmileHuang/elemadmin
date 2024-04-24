import MenuApi, { IMenuItem } from "@/api/menu"
import router from "@/router"
import { asyncify } from "@/utils/extractData"
import Layout from "@/views/Layout/index.vue"
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

const modules = import.meta.glob("@/views/**/*.vue")

export default permission
const filterAsyncRouter = (menus: IMenuItem[]): Array<RouteRecordRaw> => {
	return menus.map((menu) => {
		return {
			path: menu.path,
			name: menu.name,
			component: menu.component ? lazyComponent(menu.component): Layout,
			children: filterAsyncRouter(menu.children || [])
		}
	})
}

console.log("modules", modules)
const lazyComponent = (path: string) => modules[`/src/views${path}/index.vue`]
export const addRoutes = (routes: Array<RouteRecordRaw>) => {
	console.log("routes",routes)
		routes.forEach((route) => {
			router.addRoute(route)
		})
	
}
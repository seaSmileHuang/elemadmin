import { IMenuItem } from "@/api/menu"
import router from "@/router"
import Layout from "@/views/Layout/index.vue"
import { RouteRecordRaw } from "vue-router"
import { Commit } from "vuex"
type State = {
	routes: Array<RouteRecordRaw>,
}
const permission = {
	state: {
		routes: [],
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
			// const res = await asyncify(() => MenuApi.getUserMenus())()
			const routes = [
				{
					name: "system",
					path: "/system",
					id: "1",
					type: 0,
					meta: {
						title: "系统管理"
					},
					children: [
						{
							name: "user",
							path: "/system/user",
							component:"/system/user",
							meta: {
								title: "用户管理"
							},
							type: 1,
							id: "2",
						},
						{
							name: "role",
							path: "/system/role",
							component: "/system/role",
							meta: {
								title: "角色管理"
							},
							type: 1,
							id: 3
						}
					]
				}
			]
			commit("SET_ROUTERS", filterAsyncRouter(routes))
		},
	}
}

const modules = import.meta.glob("@/views/**/*.vue")

export default permission
// TODO: 过滤掉功能权限
// remove动态路由
const filterAsyncRouter = (menus: IMenuItem[]): Array<RouteRecordRaw> => {
	return menus.map((menu) => {
		return {
			...menu,
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
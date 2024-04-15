
import axios, { ResponseRecord } from "./index";


export type IMenuItem = {
	id: number;
	cache: boolean;
	component: string;
	componentName:string;
	hasChildren: boolean;
	hidden: boolean;
	icon: string;
	iframe: boolean;
	label: string;
	leaf: boolean;
	menuSort: number;
	path: string;
	permission: string;
	pid: number;
	title: string;
	type: number;
}
export type IMenuListDTO = {
	content: IMenuItem[],
	totalElements: number
}
type QueyMenusListParams = {
	pid?: string | number;
	
}
export default {
	getMenus(params?: QueyMenusListParams) {
		return axios.get<ResponseRecord<IMenuListDTO>>("/api/menus", {
			params
		})
	},
	addMenu(params: IMenuItem) {
		return axios.post("/api/menus", params)
	},
	editMenu(params: IMenuItem) {
		return axios.put("/api/menus", params)
	},
	deleteMenus(id: string | number) {
		return axios.delete("/api/menus", {
			data: {
				ids: [id]
			}
		})
	}
}
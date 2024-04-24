
import axios, { ResponseRecord } from "./index";


export type IMenuItem = {
	id: number |string;
	cache?: boolean;
	component?: string;
	componentName?:string;
	hasChildren?: boolean;
	hidden?: boolean;
	icon?: string;
	iFrame?: boolean;
	label?: string;
	leaf?: boolean;
	menuSort?: number;
	path: string;
	permission?: string;
	pid?: number;
	title?: string;
	type: number;
	name?: string;
	children?: IMenuItem[]
	subCount?: number
	meta?: {
		title?: string
	}
}


export type IQueyMenusListParams = {
  createTime?: string;
  blurry?: string;
  pageNum?:number;
  pageSize?:number;
	pid?:number | string;
}
export default {
	getMenus(params?: IQueyMenusListParams) {
		return axios.get<ResponseRecord<IMenuItem[]>>("/api/menu/lazy", {
			params
		})
	},
	addMenu(params: IMenuItem) {
		return axios.post("/api/menu/save", params)
	},
	editMenu(params: IMenuItem) {
		return axios.post("/api/menu/update", params)
	},
	deleteMenus(id: string | number) {
		return axios.get("/api/menu/delete", {
			params: {id: id}
		})
	},
	lazyGetMenu(id: string | number) {
		return axios.get<ResponseRecord<IMenuItem[]>>("/api/menus/lazy", {
			params: {
				pid:id
			}
		})
	},
	downloadMenus() {
		return axios.get("/api/menus/download")
	},
	getUserMenus() {
		return axios.get<ResponseRecord<IMenuItem[]>>("/api/menu/build")
	}
}
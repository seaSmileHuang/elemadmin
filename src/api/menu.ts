
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
}
export type IMenuListDTO = {
	content: IMenuItem[],
	totalElements: number
}

export type IQueyMenusListParams = {
  createTime?: string;
  blurry?: string;
  pageNum?:number;
  pageSize?:number;
	pid?:number;
}
export default {
	getMenus(params?: IQueyMenusListParams) {
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
		return axios.get<ResponseRecord<IMenuItem[]>>("/api/menus/build")
	}
}
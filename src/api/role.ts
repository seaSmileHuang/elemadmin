import axios, { ResponseRecord } from "./index";
import { IMenuItem } from "./menu";

export type IQueyRolesListParams = {
	createTime?: string;
  blurry?: string;
  pageNum:number;
  pageSize:number;
}

export type IRoleItem = {
	id?: string;
	name: string;
	dataScope?: string;
	description?: string;
	level: number;
	menus?: IMenuItem[]
}
type IRoleListDTO = {
	content: IRoleItem[],
	totalElements: number
}

type IEditMenuParams = {
	id: string | number;
	menus: IMenuItem[]
}
export default {
	getRoles(params?: IQueyRolesListParams) {
		return axios.get<ResponseRecord<IRoleListDTO>>("/api/roles", {
			params
		})
	},
	addRole(params: IRoleItem) {
		return axios.post("/api/roles", params)
	},
	editRole(params: IRoleItem) {
		return axios.put("/api/roles", params)
	},
	deleteRoles(id: string | number) {
		return axios.delete("/api/roles", {
			data: {
				ids: [id]
			}
		})
	},
	lazyGetRole(id: string) {
		return axios.get<ResponseRecord<IRoleItem[]>>("/api/roles/lazy", {
			params: {
				pid:id
			}
		})
	},
	editRoleMenu(params: IEditMenuParams) {
		return axios.put("/api/roles/menu", params)
	},
	downloadRoles() {
		return axios.get('/api/roles/download')
	}

}
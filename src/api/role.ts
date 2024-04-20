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
	menuIds?: Array<string | number>
}
type IRoleListDTO = {
	records: IRoleItem[],
	total: number
}

type IEditMenuParams = {
	id: string | number;
	menus: IMenuItem[]
}

type IBindMenuParams = {
	roleId: string | number;
	menuIds: Array<string | number>
}
export default {
	getRoles(params?: IQueyRolesListParams) {
		return axios.get<ResponseRecord<IRoleListDTO>>("/api/role/list", {
			params
		})
	},
	addRole(params: IRoleItem) {
		return axios.post("/api/role/save", params)
	},
	editRole(params: IRoleItem) {
		return axios.post("/api/role/update", params)
	},
	deleteRoles(id: string | number) {
		return axios.get("/api/role/delete", {
			params: {
				id
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
	roleDetail(id: string | number) {
		return axios.get<ResponseRecord<IRoleItem>>("/api/role/detail", {
			params: {
				id
			}
		})
	},
	editRoleMenu(params: IEditMenuParams) {
		return axios.put("/api/roles/menu", params)
	},
	downloadRoles() {
		return axios.get('/api/roles/download')
	},
	roleBindMenu(params: IBindMenuParams) {
		return axios.post("/api/role/menu/bind", params)
	}

}
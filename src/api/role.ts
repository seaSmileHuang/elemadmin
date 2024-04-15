import axios, { ResponseRecord } from "./index";

export type IQueyRolesListParams = {
	createTime?: string;
  blurry?: string;
  pageNum:number;
  pageSize:number;
}

export type IRoleItem = {
	dataScope: string;
	description: string;
	level: number;
}
type IRoleListDTO = {
	content: IRoleItem[],
	totalElements: number
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
	}
}
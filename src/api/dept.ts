import axios, { ResponseRecord } from "./index";
import { IMenuItem } from "./menu";

export type IQueyDeptsListParams = {
	createTime?: string;
  blurry?: string;
  pageNum:number;
  pageSize:number;
}

export type IDeptItem = {
	id?: string | number;
	name: string;
	label: string;
	dataScope?: string;
	level: number;
	pid?: string | number;
}
type IDeptListDTO = {
	content: IDeptItem[],
	totalElements: number
}

type IEditMenuParams = {
	id: string | number;
	menus: IMenuItem[]
}
export default {
	getDepts(params?: IQueyDeptsListParams) {
		return axios.get<ResponseRecord<IDeptListDTO>>("/api/depts", {
			params
		})
	},
	addDept(params: IDeptItem) {
		return axios.post("/api/depts", params)
	},
	editDept(params: IDeptItem) {
		return axios.put("/api/depts", params)
	},
	deleteDepts(id: string | number) {
		return axios.delete("/api/depts", {
			data: {
				ids: [id]
			}
		})
	},
	lazyGetDept({id, name}: {id?: string | number, name?: string}) {
		return axios.get<ResponseRecord<IDeptItem[]>>("/api/depts/lazy", {
			params: {
				pid:id,
				name
			}
		})
	},
	editDeptMenu(params: IEditMenuParams) {
		return axios.put("/api/depts/menu", params)
	},
	downloadDepts() {
		return axios.get('/api/depts/download')
	}

}
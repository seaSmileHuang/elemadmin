import axios, { ResponseRecord } from "./index";
import { IMenuItem } from "./menu";

export type IQueyDeptsListParams = {
createTime?: string;
  blurry?: string;
  pid?: string | number;
	departmentName?: string
}

export type IDeptItem = {
	id?: string | number;
	name: string;
	deptSort: number;
	enabled?: boolean;
	isTop?: boolean;
	subCount?: number;
	pid?: string | number;
}

type IEditMenuParams = {
	id: string | number;
	menus: IMenuItem[]
}
export default {
	getDepts(params?: IQueyDeptsListParams) {
		return axios.get<ResponseRecord<IDeptItem[]>>("/api/dept/lazy", {
			params
		})
	},
	addDept(params: IDeptItem) {
		return axios.post("/api/dept/save", params)
	},
	editDept(params: IDeptItem) {
		return axios.post("/api/dept/update", params)
	},
	deleteDepts(id: string | number) {
		return axios.get("/api/dept/delete", {
			params: {
				id
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
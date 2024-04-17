
import axios, { ResponseRecord } from "./index";

export type IUserItem = {
	id?: number | string;
	dept?: {id: number};
	email:string;
	gender?: string;
	nickname: string;
	password?:string;
	phone: string;
	username: string;
	enabled: boolean;
	jobs?: Array<{id: number}>;
	roles?: Array<{id: number}>;
	
}
export type IUserListDTO = {
	content: IUserItem[],
	totalElements: number
}

export type IQueyUsersListParams = {
  createTime?: string;
  blurry?: string;
  pageNum?:number;
  pageSize?:number;
	enabled?:boolean;
}
export default {
	getUsers(params?: IQueyUsersListParams) {
		return axios.get<ResponseRecord<IUserListDTO>>("/api/users", {
			params
		})
	},
	addUser(params: IUserItem) {
		return axios.post("/api/users", params)
	},
	editUser(params: IUserItem) {
		return axios.put("/api/users", params)
	},
	deleteUsers(id: string | number) {
		return axios.delete("/api/users", {
			data: {
				ids: [id]
			}
		})
	},
	lazyGetUser(id: string | number) {
		return axios.get<ResponseRecord<IUserItem[]>>("/api/users/lazy", {
			params: {
				pid:id
			}
		})
	},
	downloadUsers() {
		return axios.get("/api/users/download")
	}
}
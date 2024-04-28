
import axios, { ResponseRecord } from "./index";

export type IUserItem = {
	id?: number | string;
	deptId?: number | string;
	email:string;
	gender?: string;
	nickname: string;
	password?:string;
	phone: string;
	username: string;
	enabled: boolean;
	jobIds?: Array<{id: number}>;
	roleIds?: Array<{id: number}>;
	
}
export type IUserListDTO = {
	records: IUserItem[],
}

export type IQueyUsersListParams = {
  createTime?: string;
  blurry?: string;
  pageNum?:number;
  pageSize?:number;
	enabled?:boolean;
	deptId?: string | number;
}

export type IUserInfoItem = {
	token?: string;
	roles: string[];
	user: IUserItem
}

export type IUpdatePassword = {
	oldPassword: string;
	newPassword: string;
}

export type IUpdateEmail = {
	email:string;
	code: string;
	password:string
}

export type IOperationLogItem = {
	address?: string;
	browser?: string;
	createTime?: string;
	description?: string;
	requestIp?: string;
	time?: number;
}

export type IOperationLogList = {
	records: IOperationLogItem[];
	total: number;
}

type IQueryLogsParams = {
	pageNum: number;
	pageSize: number;
}
export default {
	getUsers(params?: IQueyUsersListParams) {
		return axios.get<ResponseRecord<IUserListDTO>>("/api/user/list", {
			params
		})
	},
	addUser(params: IUserItem) {
		return axios.post("/api/user/save", params)
	},
	editUser(params: IUserItem) {
		return axios.post("/api/user/update", params)
	},
	deleteUsers(id: string | number) {
		return axios.get("/api/user/delete", {
			params: {
				id
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
		return axios.get("/api/user/download", {
			responseType: "blob"

		})
	},
	updatePassword(data: IUpdatePassword) {
		return axios.post("/api/user/updatePassword", data)
	},
	updateAvatar(data: FormData) {
		return axios.post("/api/user/updateAvatar", data, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		})
	},
	updateEmail(data: IUpdateEmail) {
		return axios.post("/api/users/updateEmail", data)
	},
	getUserLogs(params: IQueryLogsParams) {
		return axios.get<ResponseRecord<IOperationLogList>>("/api/logs/user", {params})
	}

}
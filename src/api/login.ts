import axios from "./index.ts";
import { ResponseRecord } from ".";
import { IUserInfoItem } from "./user.ts";


export type LoginParams = {
	code?: string;
	password?: string;
	username?: string;
	uuid?: string;
	rememberMe?: boolean;
}
export type CodeImageRes = {
	uuid: string;
	img: string;
}

export default {
	login(data: LoginParams) {
		return axios.post<ResponseRecord<string>>("/api/auth/login", data)
	},
	logout() {
		return axios.get<ResponseRecord<null>>("/api/auth/logout")
	},
	getUserInfo() {
		return axios.get<ResponseRecord<IUserInfoItem>>("/api/auth/info")
	},
	getCodeImage() {
		return axios.get<ResponseRecord<CodeImageRes>>("/auth/code")
	}
}
import axios from "axios";
import { ResponseRecord } from ".";
import { IUserInfoItem } from "./user";


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
	login(data: string) {
		return axios.post<ResponseRecord<IUserInfoItem>>("/api/login", {
			params: data
		})
	},
	loginout() {
		return axios.post<ResponseRecord<null>>("/api/auth/logout")
	},
	getCodeImage() {
		return axios.get<ResponseRecord<CodeImageRes>>("/auth/code")
	}
}
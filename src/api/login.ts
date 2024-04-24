import axios from "axios";
import { ResponseRecord } from ".";


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
export type LoginResp = {

}
export default {
	login(data: string) {
		return axios.post<ResponseRecord<LoginResp>>("/api/login", {
			params: data
		})
	},
	getCodeImage() {
		return axios.get<ResponseRecord<CodeImageRes>>("/auth/code")
	}
}
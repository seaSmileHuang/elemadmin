import { getToken } from "@/utils/getToken";
import axios from "axios";

const service = axios.create({
	baseURL: "",
	timeout: 120000,
})

export type ResponseRecord<T = null>= {
	code: number,
	ok: boolean;
	data: T;
	msg:string;
}

service.interceptors.request.use((config) => {
	if (getToken()) {
		config.headers["Authorization"] = getToken()
	}
	config.headers["Content-Type"] = "application/json"
	return config
}, (error) => {
	Promise.reject(error)
})

export default service
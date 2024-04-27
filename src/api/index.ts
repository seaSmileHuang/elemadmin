import router from "@/router";
import store from "@/store";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import { ElMessage } from "element-plus";

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
		config.headers["Authorization"] = `Bearer ${getToken()}`
	}
	config.headers["Content-Type"] = "application/json"
	return config
}, (error) => {
	Promise.reject(error)
})


service.interceptors.response.use((response) => {
	return response
}, error => {
	const code = error.response.status
	console.log(error.toString())
	console.log("code", code)
	if (error.toString().includes("timeout")) {
		ElMessage.error("请求超时")
	} else if (code === 401) {
		store.dispatch('logout')
	} else if (code === 403) {
		router.push({path: "/403"})
	} else if (error.message?.data?.msg){
		ElMessage.error(error.response.data.msg)
	} else {
		ElMessage.error("请求接口失败")
	}
	return Promise.reject(error)
})
export default service
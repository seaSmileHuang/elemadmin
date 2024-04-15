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

export default service
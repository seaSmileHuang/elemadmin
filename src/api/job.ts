import axios, { ResponseRecord } from "./index";

export type IQueyJobsListParams = {
createTime?: string;
  blurry?: string;
  pid?: string | number;
  pageNum?: number;
  pageSize?: number
}

export type IJobItem = {
	id?: string | number;
	name: string;
	jobSort: number;
	enabled?: boolean;
	subCount?: number;
}

export type IJobResp = {
	total?: number;
	records: IJobItem[]
}

export default {
	getJobs(params?: IQueyJobsListParams) {
		return axios.get<ResponseRecord<IJobResp>>("/api/job/list", {
			params
		})
	},
	addJob(params: IJobItem) {
		return axios.post("/api/job/save", params)
	},
	editJob(params: IJobItem) {
		return axios.post("/api/job/update", params)
	},
	deleteJobs(id: string | number) {
		return axios.get("/api/job/delete", {
			params: {
				id
			}
		})
	},
	downloadJobs() {
		return axios.get('/api/jobs/download')
	}

}
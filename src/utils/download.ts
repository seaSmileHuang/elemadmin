import { AxiosResponse } from "axios"

export const download = (name: string, url: string) => {
	const link  = document.createElement("a")
	link.download = name
	link.href = url
	link.click()
}

export const downloadApi = async (api: () => Promise<AxiosResponse<Blob> >,name?: string) => {
	const res = await api()
	const filename = name ?? res.headers["Content-Disposition"]?.split("filename=")?.[1] ?? ''
	const url = URL.createObjectURL(res.data)
	download(filename, url)
}
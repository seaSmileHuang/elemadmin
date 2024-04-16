import { ModeEnum } from "@/type"
import { ref } from "vue"

const usePage = <T = any>() => {
	const pageSize = ref(10)
	const pageNum = ref(1)
	const loading = ref(false)

	const curActiveItem = ref<T>()
 	const mode = ref<ModeEnum>(ModeEnum.ADD)
	const setCurActiveItem = (item: T) => {
		curActiveItem.value = item
	}
	return {
		pageSize,
		pageNum,
		loading,
		curActiveItem,
		mode,
		setCurActiveItem
	}
}
export default usePage
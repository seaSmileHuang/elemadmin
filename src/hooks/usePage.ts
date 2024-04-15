import { ModeEnum } from "@/type"
import { ref } from "vue"

const usePage = () => {
	const pageSize = ref(10)
	const pageNum = ref(1)
	const loading = ref(false)

	const curActiveItem = ref({})
 	const mode = ref<ModeEnum>(ModeEnum.ADD)
	return {
		pageSize,
		pageNum,
		loading,
		curActiveItem,
		mode
	}
}
export default usePage
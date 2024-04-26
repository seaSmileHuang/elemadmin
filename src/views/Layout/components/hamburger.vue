<template>
	<svg-icon class="fold-icon" @click="toggleClick" :icon-class="iconClass">

	</svg-icon>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { ref, watch } from "vue";
const iconClass = ref("")

const props = defineProps({
	"is-active": {
		type: Boolean,
		default: false
	}
})

const emits = defineEmits(['toggleClick'])

const toggleClick = () => {
	emits("toggleClick")
	
}

watch(() => props['is-active'], (val) => {
	console.log("valiconClass", val)
	iconClass.value = val ?'iconunfold-copy':'iconfold'
}, {
	immediate: true
})

</script>

<style scoped lang="scss">
.fold-icon {
	padding: 0 15px;
}
</style>

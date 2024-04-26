<template>
	<svg :class="svgClass" aria-hidden="true">
		<use :xlink:href="iconName" />
	</svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
	"iconClass": {
		type: String,
		default: ''
	},
	"className": {
		type: String,
		default: ''
	}
})

const svgClass = computed(() => {
	return ['svg-icon', props.className]
})
const iconName = computed(() => {
	return `#icon-svg-${props.iconClass}`
})
</script>
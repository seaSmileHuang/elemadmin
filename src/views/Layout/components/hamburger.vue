<template>
	<div @click="toggleSlideBar">点击我</div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
const store = useStore()
const toggleSlideBar = () => {
	store.dispatch("app/toggleSidebar")
}
const props = defineProps({
	"is-active": {
		type: Boolean,
		default: false
	}
})
</script>

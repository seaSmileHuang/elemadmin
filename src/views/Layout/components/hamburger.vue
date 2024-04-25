<template>
	<el-icon @click="toggleSlideBar"><Fold v-if="props['is-active']"/><Expand v-else/></el-icon>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
const store = useStore()
const toggleSlideBar = () => {
	store.dispatch("toggleSidebar")
}
const props = defineProps({
	"is-active": {
		type: Boolean,
		default: false
	}
})
</script>

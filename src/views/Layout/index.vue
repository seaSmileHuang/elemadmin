<template>
	  <div class="app-wrapper">
    	<MenuWrapper :class="{'sidebar-container': true, 'hide-side-bar': collapsed}" />
    	<div class="main-container">
			<div @click="onClick">点击我</div>
    	  <router-view/>
    	</div>
  	</div>
</template>
<script setup>
import AppMain from "@/views/AppMain/index.vue";
import MenuWrapper from "@/views/Layout/components/menu/MenuWrapper.vue";
import {useStore} from "vuex"
import {computed} from "vue"
const store = useStore()
const onClick = () => {
	store.commit("TOGGLE_SIDEBAR")
}

const collapsed = computed(() => store.getters.sidebar.opened)
</script>

<style lang="scss" scoped>
.app-wrapper {
	display: flex;
	height: 100%;
}
.main-container {
	flex: 1;
	height: 100%;
}
@media (max-width: 992px) {
	.sidebar-container {
		width: 0;
		overflow: hidden;
	}
}
.sidebar-container.hide-side-bar {
}

</style>
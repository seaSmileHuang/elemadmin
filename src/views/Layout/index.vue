<template>
	  <div class="app-wrapper">
    	<MenuWrapper :class="{'sidebar-container': true, 'hide-side-bar': collapsed}" />
    	<div class="main-container">
				<navbar/>
				<tags-view />
				<router-view></router-view>
			</div>


  	</div>
</template>
<script setup>
import MenuWrapper from "@/views/Layout/components/menu/MenuWrapper.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import navbar from "./components/navbar.vue";
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
	max-height: 100%;
}
.main-container {
	flex: 1;
	height: 100%;
	max-height: 100%;
	overflow: scroll;
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
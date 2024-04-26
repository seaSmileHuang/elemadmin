<template>
	  <div :class="{'app-wrapper': true, 'hide-side-bar': collapsed, 'mobile': device === 'mobile'}">
			<div v-if="device === 'mobile' && !collapsed"  class="drawer-bg" @click="closeMenu"></div>
    	<MenuWrapper class="sidebar-container" />
    	<div class="main-container">
				<navbar/>
				<tags-view />
				<div class="main-wrapper">
					<router-view></router-view>
				</div>
				
			</div>


  	</div>
</template>
<script setup>
import MenuWrapper from "@/views/Layout/components/menu/MenuWrapper.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import TagsView from "./components/TagsView.vue";
import navbar from "./components/navbar.vue";
const WIDTH = 992
const store = useStore()
const onClick = () => {
	store.commit("TOGGLE_SIDEBAR")
}

const collapsed = computed(() => !store.getters.sidebar.opened)
const device = computed(() => store.getters.device)

window.addEventListener("resize", () => {
	const rect = document.body.getBoundingClientRect()
	if (rect.width < WIDTH) {
		store.dispatch("setDevice", "mobile")
		store.dispatch("closeSidebar")
	} else {
		store.dispatch("setDevice", "desktop")
		store.dispatch("closeSidebar")
	}
})

const closeMenu = () => {
	store.dispatch("closeSidebar")
}
</script>

<style lang="scss" scoped>
.app-wrapper {
	display: flex;
	height: 100%;
	max-height: 100%;
}
.main-container {
	flex: 1;
	max-height: 100%;
	overflow-y: auto;
}

@media (max-width: 992px) {
	.hide-side-bar {
		.sidebar-container {
			width: 0;
			overflow: hidden;
		}
	}

	.sidebar-container {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		z-index: 100
	}
}

.main-wrapper {
	padding: 20px 20px 45px 20px;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}


</style>
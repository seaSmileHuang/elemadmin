<template>
	  <div class="app-wrapper">
    	<MenuWrapper class="sidebar-container" />
    	<div class="main-container">
    	  <router-view/>
    	</div>
  	</div>
</template>
<script setup>
import AppMain from "@/views/AppMain/index.vue";
import MenuWrapper from "@/views/Layout/components/menu/MenuWrapper.vue";
</script>
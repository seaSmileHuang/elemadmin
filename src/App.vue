<script setup lang="ts">
import User from "@/views/system/user/index.vue"
import Dept from "@/views/system/dept/index.vue";
import Role from "@/views/system/role/index.vue"
import Menu from "@/views/system/menu/index.vue"
</script>

<template>
  <div class="app">
    <!-- <Login/> -->
    <!-- <user/> -->
    <!-- <role/> -->
    <!-- <Menu/> -->
    <!-- <MenuWrapper/> -->
    <!-- <User/> -->
    <!-- <Layout/> -->
    <router-view/>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.app {
  width: 100%;
  height: 100%;
}
</style>

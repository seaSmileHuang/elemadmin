<script setup lang="ts">
import Layout from "@/views/Layout/index.vue";
import Role from "@/views/system/role/index.vue";
import Menu from "@/views/system/menu/index.vue"
import Cookies from "js-cookie";
import {useStore} from "vuex"

</script>

<template>
  <div>
    <!-- <Role/> -->
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
</style>

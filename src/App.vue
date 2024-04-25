<script setup lang="ts">

</script>

<template>
  <div class="app">
    <!-- <Login/> -->
    <!-- <Dept/> -->
    <!-- <user/> -->
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
.app {
  width: 100%;
  height: 100%;
}
</style>

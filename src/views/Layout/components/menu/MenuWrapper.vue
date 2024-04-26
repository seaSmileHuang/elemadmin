<template>
  <div :class="{'menu-wrapper': true, 'hide-side-bar':collapsed }" >
    <el-menu 
    :text-color="menuText"
    :active-text-color="menuActiveText"
    :background-color="menuBg"
    class="menu" theme="dark" default-value="3-2" height="550px" :collapse="collapsed">
      <Menu :menu="menus" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import Menu from "./Menu.vue";
const store = useStore()
console.log('jjj', store.getters.sidebar)
const collapsed = computed(() => !store.getters.sidebar.opened)
const menus = computed(() => store.getters.routes)
// sidebar
const menuText = '#bfcbd9';
const menuActiveText = '#409EFF';
const subMenuActiveText = '#f4f4f5'; // https://github.com/ElemeFE/element/issues/12951

const menuBg = '#304156';
const menuHover = '#263445';

const subMenuBg = '#1f2d3d';
const subMenuHover = '#001528';

const sideBarWidth = '205px';




</script>

<style scoped lang="scss">
</style>
<style lang="scss">
.menu-wrapper {
  height: 100%;

  transition: width 0.2s;
  .menu {
    height: 100%;
  }
}

</style>
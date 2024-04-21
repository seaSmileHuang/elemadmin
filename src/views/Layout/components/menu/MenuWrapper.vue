<template>
  <div :class="{'menu-wrapper': true, 'hide-side-bar':collapsed }" >
    <el-menu 
    :text-color="menuText"
    :active-text-color="menuActiveText"
    :background-color="menuBg"
    class="menu" theme="dark" default-value="3-2" height="550px" :collapse="collapsed">
      <Menu :menu="menu" />

      <template #operations>
        <el-button variant="text" shape="square" @click="changeCollapsed">
          <template #icon><el-icon name="view-list" /></template>
        </el-button>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { IMenuItem } from "@/api/menu";
import { computed, ref } from "vue";
import Menu from "./Menu.vue";
import {useStore} from "vuex"
const store = useStore()
console.log('jjj', store.getters.sidebar)
const collapsed = computed(() => store.getters.sidebar.opened)
// sidebar
const menuText = '#bfcbd9';
const menuActiveText = '#409EFF';
const subMenuActiveText = '#f4f4f5'; // https://github.com/ElemeFE/element/issues/12951

const menuBg = '#304156';
const menuHover = '#263445';

const subMenuBg = '#1f2d3d';
const subMenuHover = '#001528';

const sideBarWidth = '205px';

const changeCollapsed = () => {
  collapsed.value = !collapsed.value
}

const expanded = ref([])
const menu = ref<IMenuItem[]>([
  {
    id: "1",
    path: "/",
    name: "系统管理",
    type: 1,
    icon: "setting-1",
    children: [
      {
        id: "1-1",
        path: "/mainHome/accountManage",
        name: "用户管理",
        icon: "user-circle",
        type: 2,
      },
      {
        id: "1-2",
        path: "/mainHome/roleManage",
        name: "角色管理",
        icon: "role-circle",
        type: 2,
      },
    ],
  },
])
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
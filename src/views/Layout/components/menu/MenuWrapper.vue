<template>
  <div class="menu-wrapper" >
    <el-menu v-model:expanded="expanded" 
    :text-color="menuText"
    :active-text-color="menuActiveText"
    :background-color="menuBg"
    class="menu" theme="dark" default-value="3-2" expand-mutex height="550px" :collapsed="sidebarValue.opened">
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
import { mapGetters } from "vuex";
import Menu from "./Menu.vue";

const {sidebar} = mapGetters(["sidebar"])
const sidebarValue = computed(() => sidebar())

const collapsed = ref<Boolean>(false)
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
.menu-wrapper {
  height: 100%;
}
</style>
<style lang="scss">
.menu-wrapper {
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  width: 205px;
  transition: width 0.2s;
}
.shrink-sidebar {
  .menu-wrapper {
    width: 54px !important;
  }
}
.hidden-sidebar {
  .menu-wrapper {
    width: 0 !important;
  }
}
</style>
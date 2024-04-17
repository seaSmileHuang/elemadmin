<template>
  <div class="menu-wrapper">
    <el-menu v-model:expanded="expanded" class="menu" theme="dark" default-value="3-2" expand-mutex height="550px" :collapsed="collapsed">
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
import { ref } from "vue";
import Menu from "./Menu.vue";
const collapsed = ref<Boolean>(false)

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

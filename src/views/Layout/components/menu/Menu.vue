<template>
  <template v-for="item in props.menu">
    <template v-if="item.type === MenuTypeEnum.DIRECTORY">
        <el-sub-menu :key="item.id" :value="item.path" :title="item.name">
          <template #title>
            <el-icon v-if="item.icon" :name="item.icon" />
            <span>{{item.name}}</span>
          </template>
          <Menu :menu="item.children" />
        </el-sub-menu>

    </template>

    <template v-else-if="item.type === MenuTypeEnum.MENU">
        <el-menu-item :key="item.id" :value="item.path" @click="() => onClick(item)">
          <template v-if="item.icon">
            <el-icon :name="item.icon" />
          </template>
          <template #title>{{item.name}}</template>
        </el-menu-item>

    </template>
  </template>
</template>

<script setup lang="ts">
import { IMenuItem } from "@/api/menu";
import { PropType } from "vue";
import { useRouter } from "vue-router";
import Menu from "./Menu.vue";

enum MenuTypeEnum {
  DIRECTORY = 1,
  MENU = 2,
  BUTTON = 3,
}

const props = defineProps({
  menu: {
    type: Array as PropType<IMenuItem[]>,
    default: () => [],
  },
})

const router = useRouter()
const onClick = (item: IMenuItem) => {
  router.push({
    path: item.path,
  })
}
</script>

<style lang="scss" scoped>

</style>


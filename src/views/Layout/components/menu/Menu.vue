<template>
  <template v-for="item in props.menu">
    <template v-if="item.type === MenuTypeEnum.DIRECTORY">
        <el-sub-menu :key="item.id" :value="item.path" :title="item.name">
          <template #title>
            <svg-icon v-if="item.icon" :icon-class="item.icon" style="width: 32px;height: 16px"/>
            <span>{{item.title}}</span>
          </template>
          <Menu :menu="item.children" />
        </el-sub-menu>

    </template>

    <template v-else-if="item.type === MenuTypeEnum.MENU">
        <el-menu-item :key="item.id" :value="item.path" @click="() => onClick(item)">
          <template v-if="item.icon">
            <svg-icon :icon-class="item.icon" style="width: 32px;height: 16px"/>
          </template>
          <template #title>{{item.title}}</template>
        </el-menu-item>

    </template>
  </template>
</template>

<script setup lang="ts">
import { IMenuItem } from "@/api/menu";
import SvgIcon from "@/components/SvgIcon.vue";
import { MenuTypeEnum } from "@/type.ts";
import { PropType } from "vue";
import { useRouter } from "vue-router";
import Menu from "./Menu.vue";
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


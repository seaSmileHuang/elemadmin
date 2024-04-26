<template>
  <div class="icon-body">
    <el-input v-model="name" style="position: relative;" clearable placeholder="请输入图标名称" @clear="filterIcons" @input.native="filterIcons">
      <template #suffix>
        <el-icon style="vertical-align: middle">
          <Search />
        </el-icon>
      </template>
    </el-input>
    <div class="icon-list">
      <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
        <svg-icon :icon-class="item" style="height: 30px;width: 16px;" />
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { ref } from "vue";
import svgList from "./requiredIcon";
const name = ref("")
const iconList = ref(svgList)
const emits = defineEmits(["selected"])


const selectedIcon = (icon: any) => {
  emits("selected", icon)
}

const filterIcons = () => {
  if (name.value) {
    iconList.value = iconList.value.filter((item: any) => item.includes(name.value))
  } else {
    iconList.value = iconList.value
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .icon-body {
    width: 100%;
    padding: 10px;
    .icon-list {
      height: 200px;
      overflow-y: scroll;
      div {
        height: 30px;
        line-height: 30px;
        margin-bottom: -5px;
        cursor: pointer;
        width: 33%;
        float: left;
      }
      span {
        display: inline-block;
        fill: currentColor;
        overflow: hidden;
        margin-left: 4px
      }
    }
  }
</style>
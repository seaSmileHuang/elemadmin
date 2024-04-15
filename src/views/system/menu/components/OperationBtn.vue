<template>
  <div class="crud-opts">
    <span class="crud-opts-left">
      <!--左侧插槽-->
      <slot name="left" />
      <el-button
        v-permission="props.permission?.add"
        class="filter-item"
        size="mini"
        type="primary"
        @click="props.operations?.toAdd"
      >
        新增
      </el-button>
      <el-button
        v-permission="props.permission?.edit"
        class="filter-item"
        size="mini"
        type="success"
        @click="props.operations?.toEdit"
      >
        修改
      </el-button>
      <el-button
        v-permission="props.permission?.del"
        class="filter-item"
        type="danger"
        size="mini"
        @click="props.operations?.toDelete"
      >
        删除
      </el-button>
      <el-button
        class="filter-item"
        size="mini"
        type="warning"
        @click="props.operations?.doExport"
      >导出</el-button>
      <!--右侧-->
      <slot name="right" />
    </span>
  </div>
</template>

<script setup lang="ts">
// import {
// Delete,
// Download,
// Edit,
// Plus
// } from '@element-plus/icons-vue';
const props = defineProps({
  permission: {
		type: Object,
		default: () => {}
	},
	operations: {
		type:Object,
		default: () => {}
	}
})
</script>

<style>
  .crud-opts {
    padding: 4px 0;
    display: -webkit-flex;
    display: flex;
    align-items: center;
  }
  .crud-opts .crud-opts-right {
    margin-left: auto;
  }
  .crud-opts .crud-opts-right span {
    float: left;
  }
</style>
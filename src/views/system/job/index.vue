<template>
    <div>
      <OperationBtn :operations="operations"/>
      <add-job-modal v-model:visible="isShowAddJob"  v-if="isShowAddJob" :formValue="curActiveItem" :mode="mode" @onConfirm="onConfirm"/>
        <el-table :key="jobs" ref="table" v-loading="loading" :data="jobs" style="width: 100%;" @node-click="onTableRowClick">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="jobSort" label="排序">
                <template v-slot="scope">
                {{ scope.row.jobSort }}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template v-slot="scope">
                    <el-switch
                        v-model="scope.row.enabled"
                        active-color="#409EFF"
                        inactive-color="#F56C6C"
                        @change="changeEnabled(scope.row, scope.row.enabled)"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期" />
            <!--   编辑与删除   -->
            <el-table-column
                label="操作"
                width="130px"
                align="center"
                fixed="right"
            >
            <template v-slot="scope">
                <ElButton @click="() => onEdiorJob(scope.row)">编辑</ElButton>
                <ElButton @click="() => onDeleteJob(scope.row.id)">删除</ElButton>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup lang="ts">
import JobApi,{ IJobItem, IQueyJobsListParams } from '@/api/job';
import usePage from '@/hooks/usePage';
import { ModeEnum } from '@/type';
import { downloadApi } from '@/utils/download';
import { asyncify } from '@/utils/extractData';
import { ElMessage } from 'element-plus';
import { ref, watch, computed } from 'vue';
import OperationBtn from '../menu/components/OperationBtn.vue';
import AddJobModal from "./components/AddJobModal.vue";
import type Node from 'element-plus/es/components/tree/src/model/node';
const {	pageSize,
		pageNum,
		loading,
		curActiveItem,
    setCurActiveItem,
		mode} = usePage<IJobItem>()
const query = ref<IQueyJobsListParams>({
})
const defaultProps = {
  label: "title",
  isLeaf: "isLeaf"
}

watch(query,(newValue) => {
  getAllJobs(newValue)

})

const onConfirm = () => {
  getAllJobs()
  setShowAddJob(false)
}
const jobs = ref<IJobItem[]>([])
const getAllJobs = async (query?: IQueyJobsListParams) => {
  try {
    const res = await asyncify(() => JobApi.getJobs(query))()
    jobs.value = res.records || []
  } catch(err) {
    ElMessage.error((err as Error).message ?? '删除失败')
  }
}
getAllJobs()

const operations = ref({
  toAdd() {
    setShowAddJob(true)
    mode.value = ModeEnum.ADD
    curActiveItem.value = undefined
  },
  doExport() {
    downloadApi(() => JobApi.downloadJobs())
  }
})
const isShowAddJob = ref<boolean>(false)
const setShowAddJob = (flag: boolean) => {
  console.log("ghkh ")
  isShowAddJob.value = flag
}

const changeEnabled = (row: IJobItem, enabled: boolean) => {
    console.log("enabled", enabled)
}

const onEdiorJob = (item: IJobItem) => {
  mode.value = ModeEnum.EDIT
  curActiveItem.value = item
  setShowAddJob(true)
}

const onDeleteJob = async (id: number|string) => {
  try {
    await asyncify(() => JobApi.deleteJobs(id))()
    getAllJobs()
  } catch(err) {
    ElMessage.error((err as Error).message ?? '删除失败')
  }
  
}

const onTableRowClick = (row: IJobItem) => {
  if (!row || !row.id) return;
  setCurActiveItem(row)
}

</script>
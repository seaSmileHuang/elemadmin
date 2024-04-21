<template>
    <div>
        <operation-btn :operations="operations"/>
        <add-dept-modal v-model:visible="isShowAddDept"  v-if="isShowAddDept" :formValue="curActiveItem" :mode="mode" @onConfirm="onConfirm"/>
        <!--表格渲染-->
        <el-table
        ref="table"
        v-loading="loading"
        lazy
        :load="getDeptDatas"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :data="depts"
        row-key="id"
        @node-click="onTableRowClick"
        >
        <el-table-column type="selection" width="55" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="排序" prop="deptSort" />
        <el-table-column label="状态" align="center" prop="enabled">
            <template v-slot="scope">
                <el-switch
                    v-model="scope.row.enabled"
                    :disabled="scope.row.id === 1"
                    active-color="#409EFF"
                    inactive-color="#F56C6C"
                    @change="changeEnabled(scope.row, scope.row.enabled)"
                />
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期" />
        <el-table-column label="操作" width="130px" align="center" fixed="right">
            <template v-slot="scope">
                <ElButton @click="() => onEdiorDept(scope.row)">编辑</ElButton>
                <ElButton @click="() => onDeleteDept(scope.row.id)">删除</ElButton>
            </template>
        </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import DeptApi,{ IDeptItem, IQueyDeptsListParams } from '@/api/dept';
import usePage from '@/hooks/usePage';
import { ModeEnum } from '@/type';
import { downloadApi } from '@/utils/download';
import { asyncify } from '@/utils/extractData';
import { ElMessage } from 'element-plus';
import { ref, watch, computed } from 'vue';
import OperationBtn from '../menu/components/OperationBtn.vue';
import type Node from 'element-plus/es/components/tree/src/model/node';
import AddDeptModal from './components/AddDeptModal.vue';
const {	pageSize,
		pageNum,
		loading,
		curActiveItem,
    setCurActiveItem,
		mode} = usePage<IDeptItem>()
const query = ref<IQueyDeptsListParams>({
})
const defaultProps = {
  label: "title",
  isLeaf: "isLeaf"
}

watch(query,(newValue) => {
  getAllDepts(newValue)

})

const onConfirm = () => {
  getAllDepts()
  setShowAddDept(false)
}
const depts = ref<IDeptItem[]>([])
const getAllDepts = async (query?: IQueyDeptsListParams) => {
  try {
    const res = await asyncify(() => DeptApi.getDepts(query))()
    depts.value = res.records || []
  } catch(err) {
    ElMessage.error((err as Error).message ?? '删除失败')
  }
}
getAllDepts()

const operations = ref({
  toAdd() {
    setShowAddDept(true)
  },
  doExport() {
    downloadApi(() => DeptApi.downloadDepts())
  }
})
const isShowAddDept = ref<boolean>(false)
const setShowAddDept = (flag: boolean) => {
  console.log("ghkh ")
  isShowAddDept.value = flag
}

const changeEnabled = (row: IDeptItem, enabled: boolean) => {
    console.log("enabled", enabled)
}

const onEdiorDept = (item: IDeptItem) => {
  mode.value = ModeEnum.EDIT
  curActiveItem.value = item
  setShowAddDept(true)
}

const onDeleteDept = async (id: number|string) => {
  try {
    await asyncify(() => DeptApi.deleteDepts(id))()
    getAllDepts()
  } catch(err) {
    ElMessage.error((err as Error).message ?? '删除失败')
  }
  
}

const getDeptDatas = (node: Node, resolve: (data: IDeptItem[]) => void) => {
  let pid = node.level === 0 ? 0 : node.key
  asyncify(() => DeptApi.getDepts({pid}))().then((res) => {
    resolve((res|| []).map((item) => ({...item, isLeaf: !item.subCount})))
  })

}

const onTableRowClick = (row: IDeptItem) => {
  if (!row || !row.id) return;
  setCurActiveItem(row)
}

</script>


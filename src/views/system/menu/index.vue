<template>
	<div>
    <div class="head-container">
      <el-input v-model="query.blurry" clearable placeholder="模糊搜索" style="width: 200px;" class="filter-item" />
      <el-date-picker type="daterange" v-model="query.createTime" class="date-item" range-separator=":"  start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px"/>
    </div>
    <operation-btn :operations="operations"/>
    
    <add-menu-modal v-model:visible="isShowAddMenu" v-if="isShowAddMenu" :formValue="formValue" :mode="mode" @onConfirm="onConfirm"/>
    <!--表格渲染-->
    <el-table
      :key="menus"
      ref="table"
      v-loading="listLoding"
      lazy
      :load="getMenus"
      :data="menus"
      :tree-props="{children: 'children', hasChildren: 'subCount'}"
      row-key="id"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column :show-overflow-tooltip="true" label="菜单标题" width="125px" prop="title" />
      <el-table-column prop="icon" label="图标" align="center" width="60px">
        <template v-slot="scope">
          <svg-icon :icon-class="scope.row.icon ? scope.row.icon : ''" />
        </template>
      </el-table-column>
      <el-table-column prop="menuSort" align="center" label="排序">
        <template v-slot="scope">
          {{ scope.row.menuSort }}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="permission" label="权限标识" />
      <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径" />
      <el-table-column prop="iFrame" label="外链" width="75px">
        <template v-slot="scope">
          <span v-if="scope.row.iFrame">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="cache" label="缓存" width="75px">
        <template v-slot="scope">
          <span v-if="scope.row.cache">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="hidden" label="可见" width="75px">
        <template v-slot="scope">
          <span v-if="scope.row.hidden">否</span>
          <span v-else>是</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="135px" />
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <template v-slot="scope">
          <ElButton v-permission="AuthFunction.编辑菜单" @click="() => onEdiorMenu(scope.row)">编辑</ElButton>
          <ElButton v-permission="AuthFunction.删除菜单" @click="() => onDeleteMenu(scope.row)">删除</ElButton>
        </template>
      </el-table-column>
    </el-table>
	</div>
</template>

<script setup lang="ts">
import MenuApi, { IMenuItem, IQueyMenusListParams } from "@/api/menu";
import { ModeEnum } from "@/type";
import { AuthFunction } from "@/type.ts";
import { downloadApi } from "@/utils/download";
import { asyncify } from "@/utils/extractData";
import { ElButton, ElMessage } from "element-plus";
import { ref, watch } from "vue";
import AddMenuModal from "./components/AddMenuModal.vue";
import OperationBtn from "./components/OperationBtn.vue";


const getMenus = (tree:IMenuItem, _treeNode:unknown, resolve: (data:IMenuItem[]) => void) => {
	const params = {pid: tree.id}
	asyncify(() => MenuApi.getMenus(params))().then((res) => {
    resolve(res)
    // tree.children = res
  })
}
const onConfirm = () => {
  getAllMenus()
  isShowAddMenu.value = false
  ElMessage.success("操作成功")
}

const menus = ref<IMenuItem[]>([])
const listLoding = ref(false)
const tableRef = ref()
const getAllMenus = async (query?: IQueyMenusListParams) => {
  menus.value = []
  try {
    listLoding.value = true
    const res = await asyncify(() => MenuApi.getMenus(query))()
    menus.value = res || []
  } catch(err) {
    ElMessage.error((err as Error)?.message)
  } finally {
    listLoding.value = false
  }
}
getAllMenus()

const query = ref<IQueyMenusListParams>({
  pageNum: 1,
  pageSize: 10
})

watch(query,(newValue) => {
  getAllMenus(newValue)
})
const operations = ref({
  toAdd() {
    setShowAddMenu(true)
    mode.value = ModeEnum.ADD
    formValue.value = undefined
  },
  doExport() {
    downloadApi(() => MenuApi.downloadMenus())
  }
})
const isShowAddMenu = ref<boolean>(false)
const setShowAddMenu = (flag: boolean) => {
  isShowAddMenu.value = flag
}

const formValue = ref()
const mode = ref<ModeEnum>(ModeEnum.ADD)

const onEdiorMenu = (item: IMenuItem) => {
  mode.value = ModeEnum.EDIT
  formValue.value = item
  setShowAddMenu(true)
}

const onDeleteMenu = async (item: IMenuItem) => {
  try {
    await asyncify(() => MenuApi.deleteMenus(item.id))()
    // debugger
    // const pMenu = getParentMenu(menus.value, item.pid!)
    // if (pMenu) {
    //   pMenu?.children?.splice((pMenu.children || []).findIndex((menu: IMenuItem) => menu.id === item.id), 1)
    // } else {
    //   menus.value.splice(menus.value.findIndex((menu: IMenuItem) => menu.id === item.id), 1)
    // }
    
    // //  const pMenu = menus.value.find(menu => menu.id === item.pid)
    // //  pMenu?.children?.splice(pMenu.children.findIndex(menu => menu.id === item.id), 1)
    getAllMenus()
    ElMessage.success('删除成功')
  } catch(err) {
    ElMessage.error((err as Error).message ?? '删除失败')
  }
  
}
const getParentMenu = (menus: IMenuItem[], pid: string | number) : IMenuItem | undefined=> {
  if (pid === 0) return undefined
  if (!menus?.length) return undefined
  for (let i = 0; i < menus.length; i++) {
    if(menus[i].id === pid) {
      return menus[i]
    } else {
      const foundInChildren  = getParentMenu(menus[i]?.children || [], pid)
      if (foundInChildren  !== undefined) {
        return foundInChildren 
      }
    }
  }
  return undefined;
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
 :deep(.el-input-number .el-input__inner) {
    text-align: left;
  }
 :deep(.vue-treeselect__control,::v-deep .vue-treeselect__placeholder,::v-deep .vue-treeselect__single-value) {
    height: 30px;
    line-height: 30px;
  }

</style>
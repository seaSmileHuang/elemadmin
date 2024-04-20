<template>
    <div class="head-container">
      <el-input v-model="query.blurry" clearable size="small" placeholder="模糊搜索" style="width: 200px;" class="filter-item" />
      <el-date-picker type="daterange" v-model="query.createTime" class="date-item" range-separator=":"  start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px"/>
    </div>
    <operation-btn :operations="operations"/>
    
    <add-role-modal v-model:visible="isShowAddRole"  v-if="isShowAddRole" :formValue="curActiveItem" :mode="mode" @onConfirm="onConfirm"/>
    <el-row :gutter="15">
      <!--角色管理-->
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <template #header>
            <span class="role-span">角色列表</span>
          </template>
            
          <el-table ref="table" v-loading="loading" highlight-current-row style="width: 100%;" :data="roles" @row-click="onTableRowClick">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="dataScope" label="数据权限" />
            <el-table-column prop="level" label="角色级别" />
            <el-table-column :show-overflow-tooltip="true" prop="description" label="描述" />
            <el-table-column :show-overflow-tooltip="true" width="135px" prop="createTime" label="创建日期" />
            <el-table-column label="操作" width="130px" align="center" fixed="right">
              <template v-slot="scope">
                <ElButton @click="() => onEdiorRole(scope.row)">编辑</ElButton>
                <ElButton @click="() => onDeleteRole(scope.row.id)">删除</ElButton>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <pagination />
        </el-card>
      </el-col>
      <!-- 菜单授权 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card" shadow="never">
          <template #header>
            <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
              <span class="role-span">菜单分配</span>
            </el-tooltip>
            <el-button
              v-permission="['admin','roles:edit']"
              :disabled="!showButton"
              :loading="roleLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="saveRole"
            >保存</el-button>
          </template>
          <el-tree
            ref="role"
            lazy
            :default-checked-keys="curActiveItem?.menuIds"
            :load="getMenuData"
            :props="defaultProps"
            check-strictly
            accordion
            show-checkbox
            node-key="id"
            @check="roleChange"
          />
        </el-card>
      </el-col>
    </el-row>

</template>
<script setup lang="ts">
import MenuApi, { IMenuItem } from "@/api/menu";
import RoleApi, { IQueyRolesListParams, IRoleItem } from "@/api/role";
import usePage from "@/hooks/usePage";
import { ModeEnum } from "@/type";
import { downloadApi } from "@/utils/download";
import { asyncify } from "@/utils/extractData";
import { ElMessage } from "element-plus";
import type Node from 'element-plus/es/components/tree/src/model/node';
import { computed, ref, watch } from "vue";
import OperationBtn from "../menu/components/OperationBtn.vue";
import AddRoleModal from "./components/AddRoleModal.vue";
const {	pageSize,
		pageNum,
		loading,
		curActiveItem,
    setCurActiveItem,
		mode} = usePage<IRoleItem>()
const query = ref<IQueyRolesListParams>({
  pageNum: pageNum.value,
  pageSize: pageSize.value
})
const defaultProps = {
  label: "title",
  isLeaf: "isLeaf"
}

watch(query,(newValue) => {
  getAllRoles(newValue)

})

const onConfirm = () => {
  getAllRoles()
  setShowAddRole(false)
}
const roles = ref<IRoleItem[]>([])
const getAllRoles = async (query?: IQueyRolesListParams) => {
  try {
    const res = await asyncify(() => RoleApi.getRoles(query))()
    roles.value = res.records || []
  } catch(err) {
    ElMessage.error((err as Error).message ?? '删除失败')
  }
}
getAllRoles()

const operations = ref({
  toAdd() {
    setShowAddRole(true)
  },
  doExport() {
    downloadApi(() => RoleApi.downloadRoles())
  }
})
const isShowAddRole = ref<boolean>(false)
const setShowAddRole = (flag: boolean) => {
  console.log("ghkh ")
  isShowAddRole.value = flag
}

const onEdiorRole = (item: IRoleItem) => {
  mode.value = ModeEnum.EDIT
  curActiveItem.value = item
  setShowAddRole(true)
}

const onDeleteRole = async (id: number|string) => {
  try {
    await asyncify(() => RoleApi.deleteRoles(id))()
    getAllRoles()
  } catch(err) {
    ElMessage.error((err as Error).message ?? '删除失败')
  }
  
}

const getMenuData = (node: Node, resolve: (data: IMenuItem[]) => void) => {
  let pid = node.level === 0 ? 0 : node.key
  asyncify(() => MenuApi.getMenus({pid}))().then((res) => {
    resolve(res.map((item) => ({...item, isLeaf: !item.subCount})))
  })

}
const checkedMenuKeys = ref<Array<string | number>>([])
const roleChange = (_: any, {checkedKeys}: any) => {
  console.log("checkedKeys", checkedKeys)
  checkedMenuKeys.value = checkedKeys
}
const onTableRowClick = (row: IRoleItem) => {
  if (!row || !row.id) return;
  setCurActiveItem(row)
  
}
watch(curActiveItem, async (newValue, beforeValue) => {
  if (!newValue || !newValue.id || newValue?.id === beforeValue?.id) return;
  const detail = await asyncify(() => RoleApi.roleDetail(newValue.id!))()
  checkedMenuKeys.value = detail.menuIds || []
  setCurActiveItem({
    ...newValue,
    menuIds: detail.menuIds
  })
})

const showButton = computed(() => !!curActiveItem.value)
const roleLoading = ref(false)
const saveRole = async () => {
  if (!curActiveItem?.value) return
  const params = {
    roleId: curActiveItem.value.id!,
    menuIds:checkedMenuKeys.value || []
  }
  try {
   await asyncify(() => RoleApi.roleBindMenu(params))()
  }catch(err) {
    ElMessage.error((err as Error).message)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
 ::v-deep .vue-treeselect__multi-value{
    margin-bottom: 0;
  }
 ::v-deep .vue-treeselect__multi-value-item{
    border: 0;
    padding: 0;
  }
</style>

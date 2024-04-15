<template>
    <el-row :gutter="15">
      <!--角色管理-->
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">角色列表</span>
          </div>
          <el-table ref="table" v-loading="loading" highlight-current-row style="width: 100%;" :data="roles">
            <el-table-column :selectable="checkboxT" type="selection" width="55" />
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
          <div slot="header" class="clearfix">
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
          </div>
          <el-tree
            ref="role"
            lazy
            :default-checked-keys="roleIds"
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
import { asyncify } from "@/utils/extractData";
import { ElMessage } from "element-plus";
import type Node from 'element-plus/es/components/tree/src/model/node';
import { ref, watch } from "vue";
const {	pageSize,
		pageNum,
		loading,
		curActiveItem,
		mode} = usePage()
const query = ref<IQueyRolesListParams>({
  pageNum: pageNum.value,
  pageSize: pageSize.value
})
const defaultProps = {
  label: "title",
}

watch(query,(newValue) => {
  getAllRoles(newValue)
})

const roles = ref<IRoleItem[]>([])
const getAllRoles = async (query: IQueyRolesListParams) => {
  try {
    const res = await asyncify(() => RoleApi.getRoles(query))()
    roles.value = res.content || []
  } catch(err) {
    ElMessage.error((err as Error).message ?? '删除失败')
  }
}
const operations = ref({
  toAdd() {
    setShowAddRole(true)
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
    await asyncify(() => RoleApi.deleteRoles(id))
  } catch(err) {
    ElMessage.error((err as Error).message ?? '删除失败')
  }
  
}

const getMenuData = (node: Node, resolve: (data: IMenuItem[]) => void) => {
 asyncify(() => MenuApi.lazyGetMenu(node.id))().then((res) => {
    resolve(res)
  })

}
const roleChange = () => {
  
}
</script>
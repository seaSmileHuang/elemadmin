<template>
	    <el-row :gutter="20">
      <!--侧边部门数据-->
      <el-col :xs="9" :sm="6" :md="5" :lg="4" :xl="4">
        <div class="head-container">
          <el-input
            clearable
            placeholder="输入部门名称搜索"
            prefix-icon="el-icon-search"
            class="filter-item"
            @input="(e: any) => searchDept(e.detail.value)"
          />
        </div>
        <el-tree
          node-key="id"
          :load="getDeptDatas"
          :props="defaultProps"
          :expand-on-click-node="false"
          lazy
          @node-click="(data: IDeptItem) => deptIdChange(data.id)"
        />
      </el-col>
      <!--用户数据-->
      <el-col :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
        <!--工具栏-->
        <div class="head-container">
          <!-- 搜索 -->
          <el-input
              v-model="query.blurry"
              clearable
              placeholder="输入名称或者邮箱搜索"
              style="width: 200px;"
              class="filter-item"
          />
					<el-date-picker type="daterange" v-model="query.createTime" class="date-item" range-separator=":"  start-placeholder="开始日期" end-placeholder="结束日期" style="width: 230px"/>
          <el-select
              v-model="query.enabled"
              clearable
              placeholder="状态"
              class="filter-item"
              style="width: 90px"
            >
              <el-option
                v-for="item in enabledTypeOptions"
                :key="item.key"
                :label="item.display_name"
                :value="item.key"
              />
          </el-select>
					<operation-btn :operations="operations"/>
        </div>

        <!--表格渲染-->
        <el-table :key="users" v-loading="loading" :data="users" style="width: 100%;" @row-click="onTableRowClick">
          <el-table-column type="selection" width="55" />
          <el-table-column :show-overflow-tooltip="true" prop="username" label="用户名" />
          <el-table-column :show-overflow-tooltip="true" prop="nickName" label="昵称" />
          <el-table-column prop="gender" label="性别" />
          <el-table-column :show-overflow-tooltip="true" prop="phone" width="100" label="电话" />
          <el-table-column :show-overflow-tooltip="true" width="135" prop="email" label="邮箱" />
          <el-table-column :show-overflow-tooltip="true" prop="dept" label="部门">
            <template v-slot="scope">
              <div>{{ scope.row?.dept?.name }}</div>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" prop="enabled">
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.enabled"
                active-color="#409EFF"
                inactive-color="#F56C6C"
                @change="changeEnabled"
              />
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="createTime" width="135" label="创建日期" />
					<el-table-column label="操作" width="130px" align="center" fixed="right">
            <template v-slot="scope">
              <ElButton  @click="() => onEdiorUser(scope.row)">编辑</ElButton>
              <ElButton @click="() => onDeleteUser(scope.row.id)">删除</ElButton>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <pagination />
				<el-dialog v-model="isShowTipModal" title="提示" >
					<div>此操作将{{curActiveItem?.enabled === EnableEnum.激活 ? '禁用':'激活'}} {{curActiveItem?.username}}，是否继续</div>
					<template #footer>
						<div class="dialog-footer">
							<el-button @click="onCancel">Cancel</el-button>
							<el-button type="primary" @click="onConfirm">
								Confirm
							</el-button>
						</div>
      		</template>
				</el-dialog>
      </el-col>
      <add-user-modal v-model:visible="isShowAddUser"  :formValue="curActiveItem" :mode="mode" @onConfirm="closeUserModal"/>
    </el-row>
</template>

<script setup lang="ts">
import DeptApi, { IDeptItem } from "@/api/dept";
import UserApi, { IQueyUsersListParams, IUserItem } from "@/api/user";
import usePage from '@/hooks/usePage';
import { ModeEnum } from '@/type';
import { AuthFunction } from "@/type.ts";
import { downloadApi } from '@/utils/download';
import { asyncify } from '@/utils/extractData';
import { ElMessage } from 'element-plus';
import type Node from 'element-plus/es/components/tree/src/model/node';
import { ref, watch } from 'vue';
import OperationBtn from '../menu/components/OperationBtn.vue';
import addUserModal from "./components/addUserModal.vue";
const {	pageSize,
		pageNum,
		loading,
		curActiveItem,
    setCurActiveItem,
		mode} = usePage<IUserItem>()


 const EnableEnum = {
  激活: true,
  禁用: false
}
const enabledTypeOptions = [
	{
		key: EnableEnum.激活,
		display_name: "激活"
	},
	{
		key: EnableEnum.禁用,
		display_name: "禁用"
	}
]
const onTableRowClick = (row: IUserItem) => {
  setCurActiveItem(row)
}
const query = ref<IQueyUsersListParams>({
  pageNum: pageNum.value,
  pageSize: pageSize.value
})
const defaultProps = {
  label: "name",
  isLeaf:"isLeaf"
}

const deptIdChange = (deptId?: string | number) => {
  console.log("hjhjj")
  if (!deptId) return
  query.value.deptId = deptId
}
watch(query,(newValue) => {
  getAllUsers(newValue)
}, {
  deep: true
})

const users = ref<IUserItem[]>([])
const getAllUsers = async (query?: IQueyUsersListParams) => {
  try {
    const res = await asyncify(() => UserApi.getUsers(query))()
    users.value = res.records || []
    console.log("res.record", res.records)
  } catch(err) {
    ElMessage.error((err as Error).message ?? '删除失败')
  }
}
getAllUsers()

const operations = ref({
  toAdd() {
    curActiveItem.value = undefined
    mode.value = ModeEnum.ADD

    setShowAddUser(true)
  },
  doExport() {
    downloadApi(() => UserApi.downloadUsers())
  }
})
const isShowAddUser = ref<boolean>(false)
const setShowAddUser = (flag: boolean) => {
  console.log("ghkh ")
  isShowAddUser.value = flag
}

const closeUserModal = () => {
  isShowAddUser.value = false;
  getAllUsers()
}

const onEdiorUser = (item: IUserItem) => {
  mode.value = ModeEnum.EDIT
  curActiveItem.value = item
  setShowAddUser(true)
}

const onDeleteUser = async (id: number|string) => {
  try {
    await asyncify(() => UserApi.deleteUsers(id))()
    getAllUsers()
  } catch(err) {
    ElMessage.error((err as Error).message ?? '删除失败')
  }
  
}

const isShowTipModal = ref(false)
const changeEnabled = () => {
	isShowTipModal.value = true
}
const onCancel = () => {
	isShowTipModal.value = false
}
const onConfirm = async () => {
  
	if (!curActiveItem.value) return
	const beforeEnabled = curActiveItem.value.enabled
	try {
		await UserApi.editUser({
			...curActiveItem.value,
			enabled: !beforeEnabled
		})
	} catch(err) {
		curActiveItem.value.enabled = beforeEnabled
	}
}

const getDeptDatas = (node: Node, resolve: (data: IDeptItem[]) => void) => {
  let pid
  if (node.level === 0) {
    pid = 0
  } else {
    pid = node.key
  }
  if (node.isLeaf) return resolve([])
	asyncify(() => DeptApi.getDepts({
    pid
  }))().then((res) => {
    resolve((res || []).map((dept: IDeptItem) => ({...dept, isLeaf: !dept.subCount})))
  })
}
const searchDept = async (name?: string) => {
  await asyncify(() => DeptApi.getDepts({
    departmentName: name
  }))()
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .vue-treeselect__control,::v-deep .vue-treeselect__placeholder,::v-deep .vue-treeselect__single-value {
    height: 30px;
    line-height: 30px;
  }
</style>

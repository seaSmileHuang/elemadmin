<template>
	      <!--表单渲染-->
				<el-dialog append-to-body  :close-on-click-modal="false"  :model-value="props.visible" :title="title" width="570px" @close="emits('update:visible', false)">
          <el-form ref="formRef" :inline="true" :model="form" :rules="rules" size="small" label-width="66px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model.number="form.phone" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="form.nickname" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="部门" prop="deptId">
              <el-tree-select v-model="form.deptId" node-key="id" lazy :load="loadDept" style="width: 450px;" :props="deptProps" :expand-on-click-node="false" check-on-click-node check-strictly></el-tree-select>
            </el-form-item>
            <el-form-item label="岗位" prop="jobIds">
              <el-select
                v-model="form.jobIds"
                style="width: 178px"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in jobs"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.gender" style="width: 178px">
                <el-radio value="男">男</el-radio>
                <el-radio value="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="form.enabled" >
                <el-radio
                  v-for="item in enableOptions"
                  :key="item.id"
                  :label="item.value"
                >{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;" label="角色" prop="roleIds">
              <el-select
                v-model="form.roleIds"
                style="width: 437px"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in roles"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <template #footer>
        <div class="dialog-footer">
          <el-button @click="onCancel">Cancel</el-button>
          <el-button type="primary" @click="onConfirm">
            Confirm
          </el-button>
        </div>
      </template>
        </el-dialog>
</template>

<script setup lang="ts">
import DeptApi, { IDeptItem } from "@/api/dept";
import JobApi, { IJobItem } from "@/api/job";
import RoleApi, { IRoleItem } from "@/api/role";
import UserApi, { IUserItem } from "@/api/user";
import { asyncify } from "@/utils/extractData";
import { ElMessage } from "element-plus";
import type Node from 'element-plus/es/components/tree/src/model/node';
import { ref, watch } from 'vue';
const emits = defineEmits(["update:visible", "onConfirm"])
const formRef = ref()

const deptProps = {
  label: "name",
  isLeaf: "isLeaf"
}
const userProps = {
  label: "name",
  isLeaf: "isLeaf"
}

const enableOptions = [
  {
    id: '1',
    value: true,
    label: "激活"
  },
  {
    id: "2",
    value: false,
    label: "禁用"
  }
]
const props = defineProps({
  formValue: {
    type: Object,
    default: () => ({
        name: "",
        userSort: 999
    })
	},
  mode: {
    type: String,
    validator: (value: string) => {
      const modeValues = ["ADD", "EDIT"]
      return modeValues.includes(value)
    },
    default: "ADD"
  },
  visible: {
    type: Boolean,
    default: false,
  }
})


console.log("props,",props.formValue)
const title = props.mode === "ADD" ? "新增部门":'编辑部门'

const form = ref<IUserItem>({...props.formValue} as IUserItem)

watch(() => props.visible, (newValue) => {
  console.log("变化了", props.formValue)
  if (newValue) {
    form.value = {...props.formValue} as IUserItem
  }
  
})

const roles = ref<IRoleItem[]>([])
const getRoles = async () => {
  try {
    const res = await asyncify(() => RoleApi.getRoles())()
    roles.value = res.records || []
  } catch(err) {
    ElMessage.error((err as Error).message ?? '获取角色列表失败')
  }
}
getRoles()
const jobs = ref<IJobItem[]>([])
const getJobs = async () => {
  try {
    const res = await asyncify(() => JobApi.getJobs())()
    jobs.value = res.records || []
  } catch(err) {
    ElMessage.error((err as Error).message ?? '获取岗位列表失败')
  }
}
getJobs()

const rules: any[] = []

const onCancel = () => {
  emits("update:visible", false)
}
const onConfirm = async () => {
  try {
    // 新增
    if (props.mode === "ADD") {
      await asyncify(() => UserApi.addUser(form.value))()
    } else {
      // 编辑
      await asyncify(() => UserApi.editUser(form.value))()
    }
    emits("onConfirm")
  } catch(err) {
    ElMessage.error((err as Error)?.message || "请求接口失败")
  }

  
}
const loadDept = (node: Node, resolve: (data: IDeptItem[]) => void) => {
  const pid = node.level === 0 ? 0 : node.key
  asyncify(() => DeptApi.getDepts({pid}))().then((res) => {
    resolve((res || []).map((dept) => ({...dept, isLeaf: !dept.subCount})))
  })
}

</script>
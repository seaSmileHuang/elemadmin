<template>
    <el-dialog append-to-body :close-on-click-modal="false" :model-value="true" :title="title" width="500px">
      <el-form ref="formRef" inline :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="部门排序" prop="deptSort">
          <el-input-number
            v-model.number="form.deptSort"
            :min="0"
            :max="999"
            controls-position="right"
            style="width: 370px;"
          />
        </el-form-item>
        <el-form-item label="顶级部门">
          <el-radio-group v-model="form.isTop" style="width: 140px">
            <el-radio :value="true">是</el-radio>
            <el-radio :value="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="enabled">
            <el-radio-group v-model="form.enabled" style="width: 140px">
                <el-radio :value="true">启用</el-radio>
                <el-radio :value="false">禁用</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="!form.isTop" style="margin-bottom: 0;" label="上级部门" prop="pid">
            <el-tree-select v-model="form.pid" node-key="id" lazy :load="load" style="width: 370px;" :props="deptProps" :expand-on-click-node="false" check-on-click-node check-strictly></el-tree-select>
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
const props = defineProps({
  formValue: {
    type: Object,
    default: () => ({
        name: "",
        deptSort: 999
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

const form = ref<IDeptItem>({...props.formValue} as IDeptItem || {
    name: "",
    deptSort: 999
})

const rules: any[] = []

const onCancel = () => {
  emits("update:visible", false)
}
const onConfirm = async () => {
  try {
    // 新增
    if (props.mode === "ADD") {
      await DeptApi.addDept(form.value)
    } else {
      // 编辑
      await DeptApi.editDept(form.value)
    }
    emits("onConfirm")
  } catch(err) {
    ElMessage.error((err as Error)?.message || "请求接口失败")
  }

  
}

const load = (node: Node,resolve: (arg0: IDeptItem[]) => void) => {
  console.log("node",node)
  if (node.level === 0) return resolve([
    {
      name: "顶层目录",
      id: 0,
    } as IDeptItem
  ])
  if (node.isLeaf) return resolve([])
  asyncify(() => DeptApi.getDepts({
    pid: node.key
  }))().then((res) => {
    resolve(res.map((item) => ({...item, isLeaf: !item.subCount})))
  })
}
</script>
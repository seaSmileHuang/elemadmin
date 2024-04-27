<template>
<el-dialog
    append-to-body
    :close-on-click-modal="false"
    :model-value="$props.visible"
    :title="title"
    width="500px"
    @close="emits('update:visible', false)"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item
        label="排序"
        prop="jobSort"
      >
        <el-input-number
          v-model.number="form.jobSort"
          :min="0"
          :max="999"
          controls-position="right"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="enabled"
      >
        <el-radio
          v-for="item in jobStatus"
          :key="item.value"
          v-model="form.enabled"
          :value="item.value"
        >
          {{ item.label }}
        </el-radio>
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
import JobApi, { IJobItem } from "@/api/job";
import { ElMessage } from "element-plus";
import { ref } from 'vue';
const emits = defineEmits(["update:visible", "onConfirm"])
const formRef = ref()

const jobStatus = [
    {
        label: "启用",
        value: true
    },
    {
        label: "禁用",
        value: false
    }
]

const props = defineProps({
  formValue: {
    type: Object,
    default: () => ({
        name: "",
        jobSort: 999
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
const title = props.mode === "ADD" ? "新增岗位":'编辑岗位'

const form = ref<IJobItem>({...props.formValue} as IJobItem || {
    name: "",
    jobSort: 999
})

const rules: any[] = []

const onCancel = () => {
  emits("update:visible", false)
}
const onConfirm = async () => {
  try {
    // 新增
    if (props.mode === "ADD") {
      await JobApi.addJob(form.value)
    } else {
      // 编辑
      await JobApi.editJob(form.value)
    }
    emits("onConfirm")
  } catch(err) {
    ElMessage.error((err as Error)?.message || "请求接口失败")
  }

  
}


</script>
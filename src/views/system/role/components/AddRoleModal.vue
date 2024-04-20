<template>
	    <!-- 表单渲染 -->
		<el-dialog append-to-body :close-on-click-modal="false" :model-value="props.visible" title="新增角色" width="520px">
      <el-form ref="formRef" :inline="true" :model="form" size="small" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" style="width: 380px;" />
        </el-form-item>
        <el-form-item label="角色级别" prop="level">
          <el-input-number v-model.number="form.level" :min="1" controls-position="right" style="width: 145px;" />
        </el-form-item>
        <!-- <el-form-item label="数据范围" prop="dataScope">
          <el-select v-model="form.dataScope" style="width: 140px" placeholder="请选择数据范围" @change="changeScope">
            <el-option
              v-for="item in dateScopes"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item v-if="form.dataScope === '自定义'" label="数据权限" prop="depts">
          <treeselect
            v-model="deptDatas"
            :load-options="loadDepts"
            :options="depts"
            :flat="true"
            :auto-select-descendants="true"
            :default-expand-level="1"
            multiple
            style="width: 380px"
            placeholder="请选择"
          />
        </el-form-item> -->
        <el-form-item label="描述信息" prop="description">
          <el-input v-model="form.description" style="width: 380px;" rows="5" type="textarea" />
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
import RoleApi, { IRoleItem } from "@/api/role";
import { ElMessage } from "element-plus";
import { PropType, ref, watch } from "vue";
const formRef = ref()
const emits = defineEmits(["update:visible", "onConfirm"])
const props = defineProps({
	formValue: {
		type: Object as PropType<IRoleItem>,
		default: () => ({
			level: 3,
			name: ""
		})
	},
	visible: {
		type: Boolean,
		default: false
	},
  mode: {
    type: String,
    validator: (value: string) => {
      const modeValues = ["ADD", "EDIT"]
      return modeValues.includes(value)
    },
    default: "ADD"
  },
})
const form = ref<IRoleItem>(props.formValue || {
	level:3,
	name: ""
})


const onCancel = () => {
	emits("update:visible", false)
}

const onConfirm = async () => {
	try {
    // 新增
    if (props.mode === "ADD") {
      await RoleApi.addRole(form.value)
    } else {
      // 编辑
      await RoleApi.editRole(form.value)
    }
    emits("onConfirm")
	} catch(err) {
		ElMessage.error((err as Error).message)
	}
}
</script>
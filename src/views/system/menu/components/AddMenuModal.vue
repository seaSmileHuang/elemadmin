<template>
	  <!--表单渲染-->
		<el-dialog append-to-body :close-on-click-modal="false" :model-value="true" :title="title" width="580px">
      <el-form ref="formRef" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="form.type" size="mini" style="width: 178px">
            <el-radio-button :label="0">目录</el-radio-button>
            <el-radio-button :label="1">菜单</el-radio-button>
            <el-radio-button :label="2">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="form.type !== 2" label="菜单图标" prop="icon">
          <el-popover
            placement="bottom-start"
            width="450"
            trigger="click"
          >
            <IconSelect ref="iconSelect" @selected="selected" />
            <template #reference>
              <el-input  v-model="form.icon" style="width: 450px;" placeholder="点击选择图标" readonly>
                <template #prefix>
                  <svg-icon v-if="form.icon" :icon-class="form.icon" class="el-input__icon" style="height: 32px;width: 16px;" />
                  <el-icon  v-else> 
                    <Search/>
                  </el-icon>
                </template>
                
              </el-input>
            </template>

          </el-popover>
        </el-form-item>
        <el-form-item v-show="form.type !== 2" label="外链菜单" prop="iFrame">
          <el-radio-group v-model="form.iFrame" size="mini">
            <el-radio-button label="true">是</el-radio-button>
            <el-radio-button label="false">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="form.type === 1" label="菜单缓存" prop="cache">
          <el-radio-group v-model="form.cache" size="mini">
            <el-radio-button label="true">是</el-radio-button>
            <el-radio-button label="false">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="form.type !== 2" label="菜单可见" prop="hidden">
          <el-radio-group v-model="form.hidden" size="mini">
            <el-radio-button label="false">是</el-radio-button>
            <el-radio-button label="true">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type !== 2" label="菜单标题" prop="meta.title">
          <el-input v-model="form.meta.title" :style=" form.type === 0 ? 'width: 450px' : 'width: 178px'" placeholder="菜单标题" />
        </el-form-item>
        <el-form-item v-if="form.type === 2" label="按钮名称" prop="meta.title">
          <el-input v-model="form.meta.title" placeholder="按钮名称" style="width: 178px;" />
        </el-form-item>
        <el-form-item v-show="form.type !== 0" label="权限标识" prop="permission">
          <el-input v-model="form.permission" :disabled="form.iFrame" placeholder="权限标识" style="width: 178px;" />
        </el-form-item>
        <el-form-item v-if="form.type !== 2" label="路由地址" prop="path">
          <el-input v-model="form.path" placeholder="路由地址" style="width: 178px;" />
        </el-form-item>
        <el-form-item label="菜单排序" prop="menuSort">
          <el-input-number v-model.number="form.menuSort" :min="0" :max="999" controls-position="right" style="width: 178px;" />
        </el-form-item>
        <el-form-item v-show="form.type === 1" label="菜单名称" prop="name">
          <el-input v-model="form.name" style="width: 178px;" placeholder="匹配组件内Name字段" />
        </el-form-item>
        <el-form-item v-show="form.type === 1" label="组件路径" prop="component">
          <el-input v-model="form.component" style="width: 178px;" placeholder="组件路径" />
        </el-form-item>
        <el-form-item label="上级目录" prop="pid" >     
          <el-tree-select v-model="form.pid" node-key="id" lazy :load="load" style="width: 450px;" :props="menuProps" :expand-on-click-node="false" check-on-click-node check-strictly>
        </el-tree-select >
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
import MenuApi, { IMenuItem } from "@/api/menu";
import SvgIcon from "@/components/SvgIcon.vue";
import { asyncify } from "@/utils/extractData";
import { ElMessage } from "element-plus";
import type Node from 'element-plus/es/components/tree/src/model/node';
import { ref } from 'vue';
import IconSelect from "./IconSelect/index.vue";
const emits = defineEmits(["update:visible", "onConfirm"])
const formRef = ref()

const menuProps = {
  label: "title",
  isLeaf: "isLeaf"
}
const props = defineProps({
  formValue: {
		type: Object,
    default: () => ({
      type: 1,
      hidden: false,
      iFrame: false,
      meta: {}
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
const title = props.mode === "ADD" ? "新增菜单":'编辑菜单'

const form = ref<IMenuItem>({...props.formValue} as IMenuItem || {
  type: 1,
  hidden: false,
  iFrame: false,
  meta: {}
})

const rules: any[] = []
// watch(props.formValue.value, (newValue) => {
//   console.log("newValue", newValue)
//   form.value = newValue.value 
// })

const onCancel = () => {
  emits("update:visible", false)
}
const onConfirm = async () => {
  try {
    // 新增
    if (props.mode === "ADD") {
      await MenuApi.addMenu(form.value)
    } else {
      // 编辑
      await MenuApi.editMenu(form.value)
    }
    emits("onConfirm")
  } catch(err) {
    ElMessage.error((err as Error)?.message || "请求接口失败")
  }

  
}

const load = (node: Node,resolve: (arg0: IMenuItem[]) => void) => {
  console.log("node",node)
  if (node.level === 0) return resolve([
    {
      title: "顶层目录",
      id: 0,
    } as IMenuItem
  ])
  if (node.isLeaf) return resolve([])
  asyncify(() => MenuApi.getMenus({
    pid: node.key
  }))().then((res) => {
    resolve(res.map((item) => ({...item, isLeaf: !item.subCount})))
  })
}

const selected = (icon: string) => {
  form.value.icon = icon
}
</script>
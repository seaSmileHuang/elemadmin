<template>
  <div style="display: inline-block">
    <el-dialog :model-value="true" :close-on-click-modal="false"  title="更新密码" append-to-body width="500px" @close="cancel">
      <el-form ref="formRef" :model="form" :rules="rules" size="small" label-width="88px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" auto-complete="on" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" auto-complete="on" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" auto-complete="on" style="width: 370px;" />
        </el-form-item>
      </el-form>
			<template #footer>
				<div class="dialog-footer">
        	<el-button type="text" @click="cancel">取消</el-button>
        	<el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      	</div>
			</template>

    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import UserApi, { IUpdatePassword } from '@/api/user';
import { asyncify } from '@/utils/extractData';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const emits = defineEmits([
  'update:visible'
])

const formRef = ref()
const form = ref<IUpdatePassword & { confirmPassword?: string }>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const confirmPass = (rule, value, callback) => {
  if (value) {
    if (form.value?.newPassword !== value) {
      callback(new Error('两次输入的密码不一致'))
    } else {
      callback()
    }
  } else {
      callback(new Error('请再次输入密码'))
	}
}
const rules = {
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: confirmPass, trigger: 'blur' }
  ]
}

const cancel = () => {
	emits("update:visible",false)
}

const loading = ref(false)
const doSubmit = async () => {
  await formRef.value?.validate()
	try {
		loading.value = true
		await asyncify(() => UserApi.updatePassword(form.value))()
		ElMessage.success("修改密码成功")
	} catch(err) {
		ElMessage.error((err as Error).message || "修改密码失败")
	} finally {
		loading.value = false
	}
}
</script>
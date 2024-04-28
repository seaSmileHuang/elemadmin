<template>
  <div style="display: inline-block;">
    <el-dialog :model-value="true" :close-on-click-modal="false" title="更新邮箱" append-to-body width="475px" @close="cancel">
      <el-form ref="formRef" :model="form" :rules="rules" size="small" label-width="88px">
        <el-form-item label="新邮箱" prop="email">
          <el-input v-model="form.email" auto-complete="on" style="width: 200px;" />
          <!-- <el-button :loading="codeLoading" :disabled="isDisabled" size="small" @click="sendCode">{{ buttonName }}</el-button> -->
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" style="width: 320px;" />
        </el-form-item>
        <el-form-item label="当前密码" prop="password">
          <el-input v-model="form.password" type="password" style="width: 320px;" />
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
import { IUpdateEmail } from '@/api/user';
import { validEmail } from '@/utils/validate';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
const emits = defineEmits(['update:visible'])
const store = useStore()
const user = computed(() => store.getters.user)
const formRef = ref()
const form = ref<IUpdateEmail>({
  code: "",
  email: "",
  password: ""
})

const cancel = () =>{
	emits('update:visible', false)
}

const loading = ref(false)
const doSubmit = () => {
	loading.value = true
}
const validMail = (rule, value: any, callback: any) => {
      if (value === '' || value === null) {
        callback(new Error('新邮箱不能为空'))
      } else if (value === user.value.email) {
        callback(new Error('新邮箱不能与旧邮箱相同'))
      } else if (validEmail(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式错误'))
      }
    }
const rules =  {
        pass: [
          { required: true, message: '当前密码不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validMail, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
</script>
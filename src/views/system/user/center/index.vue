<template>
	<div class="user-center">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5" style="margin-bottom: 10px">
        <el-card class="box-card">
          <template #header>
            <div class="clearfix">
              <span>个人信息</span>
            </div>
          </template>

          <div>
            <div style="text-align: center">
              <div class="el-upload">
                <img :src="user.avatarName" title="点击上传头像" class="avatar" @click="showUploadModal">
								<MyUpload v-if="showUpload" @update:visible="showUpload = $event"/>
              </div>
            </div>
            <ul class="user-info">
              <li><div style="height: 100%"><svg-icon icon-class="login" /> 登录账号<div class="user-right">{{ user.username }}</div></div></li>
              <li><svg-icon icon-class="user1" /> 用户昵称 <div class="user-right">{{ user.nickName || "--" }}</div></li>
              <li><svg-icon icon-class="dept" /> 所属部门 <div class="user-right"> {{ user.dept?.name || "--"}}</div></li>
              <li><svg-icon icon-class="phone" /> 手机号码 <div class="user-right">{{ user.phone || "--"}}</div></li>
              <li><svg-icon icon-class="email" /> 用户邮箱 <div class="user-right">{{ user.email || "--"}}</div></li>
              <li>
                <svg-icon icon-class="anq" /> 安全设置
                <div class="user-right">
                  <el-button type="text" @click="showPassword">修改密码</el-button>
                  <el-button type="text" @click="showEmailModal">修改邮箱</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
        <!--    用户资料    -->
        <el-card class="box-card">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户资料" name="first">
              <el-form ref="formRef" :model="form" :rules="rules" style="margin-top: 10px;" size="small" label-width="65px">
                <el-form-item label="昵称" prop="nickName">
                  <el-input v-model="form.nickName" style="width: 35%" />
                  <span style="color: #C0C0C0;margin-left: 10px;">用户昵称不作为登录使用</span>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form.phone" style="width: 35%;" />
                  <span style="color: #C0C0C0;margin-left: 10px;">手机号码不能重复</span>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="form.gender" style="width: 178px">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="">
                  <el-button :loading="saveLoading" size="mini" type="primary" @click="doSubmit">保存配置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!--    操作日志    -->
            <el-tab-pane label="操作日志" name="second">
              <el-table v-loading="loading" :data="operationLogs" style="width: 100%;">
                <el-table-column prop="description" label="行为" />
                <el-table-column prop="requestIp" label="IP" />
                <el-table-column :show-overflow-tooltip="true" prop="address" label="IP来源" />
                <el-table-column prop="browser" label="浏览器" />
                <el-table-column prop="time" label="请求耗时" align="center">
                  <template v-slot="scope">
                    <el-tag v-if="scope.row.time <= 300">{{ scope.row.time }}ms</el-tag>
                    <el-tag v-else-if="scope.row.time <= 1000" type="warning">{{ scope.row.time }}ms</el-tag>
                    <el-tag v-else type="danger">{{ scope.row.time }}ms</el-tag>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                >
                  <template #header>
                    <div style="display:inline-block;float: right;cursor: pointer" @click="init">创建日期<i class="el-icon-refresh" style="margin-left: 40px" /></div>
                  </template>
                  <template v-slot="scope">
                    <span>{{ scope.row.createTime }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <!--分页组件-->
              <!-- <el-pagination
                :total="total"
                :current-page="page + 1"
                style="margin-top: 8px;"
                layout="total, prev, pager, next, sizes"
                @size-change="sizeChange"
                @current-change="pageChange"
              /> -->
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
		<update-email v-if="updateEmailVisible" @update:visible="updateEmailVisible = $event"/>
		<update-password v-if="updatePasswordVisible"  @update:visible="updatePasswordVisible = $event"/>
	</div>
</template>

<script setup lang="ts">
import UserApi, { IOperationLogItem } from "@/api/user";
import SvgIcon from "@/components/SvgIcon.vue";
import { asyncify } from "@/utils/extractData";
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import MyUpload from "./components/myUpload.vue";
import updateEmail from "./components/updateEmail.vue";
import updatePassword from "./components/updatePassword.vue";
const store = useStore()

const user = computed(() => store.getters.user)

const formRef = ref()
const {nickName, phone, gender} = user.value
const form = ref({
  nickName,
  phone,
  gender
})

const activeName = ref("first")
const handleClick = () => {
	activeName.value = activeName.value === 'first' ? 'second' : 'first'
}

const updateEmailVisible = ref(false)
const updatePasswordVisible = ref(false)
const showUpload = ref(false)
const showPassword = () => {
	updatePasswordVisible.value = true
}
const showEmailModal = () => {
	updateEmailVisible.value = true
}

const showUploadModal = () => {
	showUpload.value = true
}

const saveLoading = ref(false)

const doSubmit = () => {

}

const rules = {

}

const loading = ref(false)
const operationLogs = ref<IOperationLogItem[]>([])

const getOperationLogs = async () => {
  
  try {
    loading.value = true
    const res = await asyncify(() => UserApi.getUserLogs({pageNum: 1, pageSize: 10}))()
    operationLogs.value = res.records || []
  } catch (err) {
    ElMessage.error((err as Error).message)
  } finally {
    loading.value = false
  }

}

const init = () => {
  getOperationLogs()
}
getOperationLogs()
</script>

<style rel="stylesheet/scss" lang="scss">
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .user-info {
    padding-left: 0;
    list-style: none;
    li{
      border-bottom: 1px solid #F0F3F4;
      padding: 11px 0;
      font-size: 13px;
    }
    .user-right {
      float: right;
      a{
        color: #317EF3;
      }
    }
  }
</style>
<template>
  <div class="login" :style="'background-image:url('+ Background +');'">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <h3 class="title">
        ELADMIN 后台管理系统
      </h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeImage" @click="getCode">
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script setup lang="ts">
import LoginApi, { LoginParams } from "@/api/login";
import Background from "@/assets/images/background.jpeg";
import config from "@/config";
import encrypt from "@/utils/encrypt";
import { asyncify } from "@/utils/extractData";
import { ElMessage } from 'element-plus';
import Cookies from "js-cookie";
import { ref, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const loginFormRef = ref()
const loginForm = ref<LoginParams>({})
const route  = useRoute()
const router = useRouter()
const store = useStore()
const loading = ref(false)

watch(route, () => {
	const username = Cookies.get("username")
	const password = Cookies.get("password")
	const rememberMe = Cookies.get("rememberMe")
	loginForm.value = { 
		username,
		password,
		rememberMe: rememberMe === "true" ? true:false
	}
}, {
	immediate: true
})
const handleLogin = async () => {
	await loginFormRef.value?.validate()
	loading.value = true
	try {
    // await store.dispatch("user/login", encrypt(JSON.stringify(loginForm.value)))
    await store.dispatch("login",loginForm.value)
		if (loginForm.value?.rememberMe) {
			Cookies.set("username", loginForm.value?.username!, {expires: config.passCookieExpires})
			Cookies.set("password", loginForm.value?.password!, {expires: config.passCookieExpires})
			Cookies.set("rememberMe",String(loginForm.value?.rememberMe), {expires: config.passCookieExpires})
		} else {
			Cookies.remove("username")
			Cookies.remove("password")
			Cookies.remove("rememberMe")
		}
		if (route.query.redirect) {
			router.replace({path: route.query.redirect as string})
		} else {
      router.push({path: "/home" })
    }
		
	} catch(err) {
		ElMessage.error((err as Error).message)
	} finally {
		loading.value = false
	}
}

const codeImage = ref("")
const getCode = async () => {
	const res = await asyncify(() => LoginApi.getCodeImage())()
	codeImage.value = res.img
}
getCode()
const  loginRules = {
	username: [
		{
			required: true,
			message: "名称不能为空"
		}
	],
	password: [
		{
			required: true,
			message: "密码不能为空"
		}
	],
	code: [
		{
			required: true,
			message: "验证码不能为空"
		}
	]
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-size: cover;
  }
  .title {
    margin: 0 auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 385px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;width: 14px;margin-left: 2px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    display: inline-block;
    height: 38px;
    float: right;
    img{
      cursor: pointer;
      vertical-align:middle
    }
  }
</style>

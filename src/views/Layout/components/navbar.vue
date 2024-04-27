<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <div class="right-menu-btn">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <el-tooltip content="项目文档" effect="dark" placement="bottom">
          <el-icon class="right-menu-item hover-effect" ><Document /></el-icon>
        </el-tooltip>

        <el-tooltip content="全屏缩放" effect="dark" placement="bottom">
          <el-icon class="right-menu-item hover-effect" @click="fullScreen"><FullScreen /></el-icon>
        </el-tooltip>

        <el-tooltip content="布局设置" effect="dark" placement="bottom">
          <div id="size-select" class="right-menu-item hover-effect">布局设置</div>
        </el-tooltip>

      </div>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="" class="user-avatar">
          <el-icon><CaretBottom /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <span style="display:block;" >
              <el-dropdown-item>
                布局设置
              </el-dropdown-item>
            </span>
            <router-link to="/user/center">
              <el-dropdown-item>
                个人中心
              </el-dropdown-item>
            </router-link>
            <span style="display:block;">
              <el-dropdown-item divided @click="showModal">
                退出登录
              </el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </template>

      </el-dropdown>
      <el-dialog append-to-body v-model="visible" title="提示" :width="400">
        <span>确定注销并退出系统吗</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="onCancel">Cancel</el-button>
            <el-button type="primary" @click="onConfirm">
              Confirm
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import breadcrumb from "./breadcrumb.vue";
import hamburger from "./hamburger.vue";
const store = useStore()
const router = useRouter()
const opened = computed(() => store.getters.sidebar.opened)

const toggleSideBar = () => {
  store.dispatch("toggleSidebar")
}
const visible = ref(false)
const showModal = () => {
  visible.value = true
}
const onCancel = () => {
  visible.value = false
}

const onConfirm = async () => {
  try {
    await store.dispatch("logout")
    router.replace("/login")
  } catch(err) {
    ElMessage.error((err as Error).message)
  }
}

const fullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu-btn {
    display: inline-block;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: middle;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
@media (max-width: 992px) {
	.right-menu-btn {
		display: none;
	}
}
</style>
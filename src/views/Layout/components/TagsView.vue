<template>
	<div class="tags-view-container">
		<div class="tags-view-wrapper">
			<div v-for="(tag, index) in tagViews" :class="{'tags-view-item': true, 'active': activeView?.path === tag.path}" @click="() => changeActiveItem(tag)">
				<router-link :to="tag.path" :custom="true">
            {{ tag.meta?.title }}
            <el-icon v-if="index" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"><Close /></el-icon>

				</router-link>
			</div>
		</div>
	</div>

</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore()
const route  = useRoute()
const router = useRouter()
const tagViews= computed<RouteRecordRaw[]>(() => store.getters.tagViews)

const activeView = ref()
watch(() => route.path, async () => {
	console.log("进来了", route)
	if (tagViews.value?.[0]?.name !== "home") {
		await store.dispatch("addTagViews", {
			name: "home",
			path: "/home",
			meta: {
				title: "首页"
			}
		})
	}
	activeView.value = route
	if ((tagViews.value || []).findIndex((tag) => tag.path === route.path) !== -1) {
		// 已有导航，无需再次添加
		return;
	}
	await store.dispatch("addTagViews", {...route})
}, {
	immediate: true
})

const closeSelectedTag = async (route:RouteRecordRaw) => {
	await store.dispatch("deleteTagView", route)
	if (activeView.value?.path === route.path) {
		// 设置为最后一个
		const tags = tagViews.value || []
		activeView.value = tags[tags.length -1]
	}
}

const changeActiveItem = (tag: RouteRecordRaw) => {
	activeView.value = tag
  router.push({path: tag.path})
}
</script>


<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 4px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: text-bottom;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}

</style>

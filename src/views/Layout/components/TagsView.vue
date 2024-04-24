<template>
	<div class="tags-view-wrapper">
		<div v-for="tag in tagViews" class="tags-view-item">
			<route-link :to="tag.path" tag="span">
				{{ tag.name }}
				<span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></span>
			</route-link>
	</div>
	</div>

</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { RouteRecordRaw, useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore()
const route  = useRouter()
const tagViews = computed(() => store.getters.tagViews)

watch(route, async () => {
	if (tagViews.value?.[0]?.name !== "home") {
		await store.dispatch("addTagViews", {
			name: "home",
			path: "/home",
			meta: {
				title: "首页"
			}
		})
	}
	await store.dispatch("addTagViews", route)
}, {
	immediate: true
})

const closeSelectedTag = (route:RouteRecordRaw) => {
	store.dispatch("deleteTagView", route)
}
</script>


<style lang="scss" scoped>
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
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
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==breadcrumbs.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const breadcrumbs = ref<any[]>([])
const route = useRoute()
const router = useRouter()
watch(() => route.path, () => {
	let activeRoutes: any[] = route.matched.filter((match) => match.meta && match.meta.title) || []
	if (activeRoutes[0] && activeRoutes[0]?.name !== 'home') {
		activeRoutes = [{name: "home", path:"/home",meta: {title: "首页"}}].concat(activeRoutes)
	}
	breadcrumbs.value = activeRoutes
	
})

const handleLink = (item: any) => {
	router.push({path: item.path})
}
</script>
<template>
	<el-dialog :model-value="true" close-on-click-modal="false" title="" append-to-body width="475px" @close="cancel" >
		<el-upload
			class="upload-demo"
			drag
			action="/api/users/updateAvatar"
		>
			<el-icon class="el-icon--upload"><upload-filled /></el-icon>
			<div class="el-upload__text">
				Drop file here or <em>click to upload</em>
			</div>
		</el-upload>
	</el-dialog>
</template>

<script setup lang="ts">
const emits = defineEmits(["update:visible"])
const cancel = () => {
	emits("update:visible", false)
}
</script>
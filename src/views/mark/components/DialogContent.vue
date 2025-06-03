<script setup>
import { ref } from 'vue'

const props = defineProps({
  onClose: Function
})
</script>
<template>
  <div>
    <slot name="content"></slot>
    <el-button type="primary" @click="props.onClose">关闭</el-button>
  </div>
</template>
<style lang='less' scoped>

</style>
<!-- 下雪 -->
<script setup>
import SnowEffect from "@/utils/cesiumCtrl/snow.js"
import { useStore } from "vuex"
import { onUnmounted } from "vue"

onUnmounted(() => {
  snow.destroy()
})
const store = useStore()
console.log(SnowEffect)
console.log(window.$viewer)
const snow = new SnowEffect(window.$viewer, {
  snowSize: 0.02, // 雪花大小
  snowSpeed: 60.0, // 雪速
})
const hide = () => {
  snow.show(false)
}
const start = () => {
  snow.show(true)
}
</script>
<template>
  <div class="container">
    <el-button type="primary" @click="start">开始</el-button>
    <el-button type="primary" @click="hide">停止</el-button>
  </div>
</template>

<style lang="less" scoped>
.container {
  position: absolute;
  z-index: 100;
}
</style>
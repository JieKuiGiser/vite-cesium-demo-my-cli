<!-- 下雨 -->
<script setup>
import RainEffect from "@/utils/cesiumCtrl/rain.js"
import { useStore } from "vuex"
import { onUnmounted } from "vue"

const store = useStore()
const instance = new RainEffect(window.$viewer, {
  tiltAngle: -0.2, //倾斜角度
  rainSize: 0.3, // 雨大小
  rainSpeed: 100.0 // 雨速
})

const hide = () => {
  instance.show(false)
}
const start = () => {
  instance.show(true)
}
onUnmounted(() => {
  instance.destroy()
})
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
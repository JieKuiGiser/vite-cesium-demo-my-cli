<!--
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-01-12 16:18:19
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-01-12 17:57:47
-->
<script setup>
import * as Cesium from 'cesium'
import { useStore } from 'vuex'
import { onUnmounted, ref } from 'vue'
import CircleDiffusion from "@/utils/cesiumCtrl/diffuse.js"
import { COORDINATE } from "@/common/constant.js"

const store = useStore()
const { viewer } = store.state

window.$viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(...COORDINATE, 10000),
})

// 圆扩散
const circleDiffusion = new CircleDiffusion(window.$viewer, "circle");
circleDiffusion.add([...COORDINATE, 10], "#F7EB08", 2000, 5000);

const onClear = () => {
  circleDiffusion.del("circle")
}
onUnmounted(() => {
  onClear()
})
</script>
<template>
  <operate-box>
    <el-button type='primary' @click='onClear'>清除</el-button>
  </operate-box>
</template>
<style scoped lang='less'>

</style>
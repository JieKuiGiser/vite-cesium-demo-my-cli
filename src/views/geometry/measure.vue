<!--
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-01-16 15:06:26
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-01-16 16:47:05
-->
<script setup>
import * as Cesium from 'cesium'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import MeasureTool from "@/utils/cesiumCtrl/measure.js"

const store = useStore()


window.$viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
})
const measure = new MeasureTool(window.$viewer)

const onLineMeasure = () => {
  measure.drawLineMeasureGraphics({
    clampToGround: true,
    callback: (e) => {
      console.log("----", e)
    }
  });
}
const onAreaMeasure = () => {
  measure.drawAreaMeasureGraphics({
    clampToGround: true,
    callback: () => { }
  });
}
const onTrianglesMeasure = () => {
  measure.drawTrianglesMeasureGraphics({
    callback: () => { }
  });
}
const onClear = () => {
  measure._drawLayer.entities.removeAll();
}
</script>
<template>
  <operate-box>
    <el-button type='primary' @click='onLineMeasure'>空间距离</el-button>
    <el-button type='primary' @click='onAreaMeasure'>空间面积</el-button>
    <el-button type='primary' @click='onTrianglesMeasure'>三角量测</el-button>
    <el-button type='primary' @click='onClear'>清除</el-button>
  </operate-box>
</template>
<style scoped lang='less'>

</style>
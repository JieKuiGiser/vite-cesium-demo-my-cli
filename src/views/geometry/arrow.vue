
<script setup>
import * as Cesium from 'cesium'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import Arrow from "@/utils/cesiumCtrl/drawArrow/drawPlot"

const store = useStore()

Arrow.disable()
Arrow.init(window.$viewer)

const drawStraightArrow = () => {
  Arrow.draw("straightArrow")
}
const drawAttackArrow = () => {
  Arrow.draw("attackArrow");
}
const drawPincerArrow = () => {
  Arrow.draw("pincerArrow");
}

</script>
<template>
  <operate-box>
    <el-button type='primary' @click='drawStraightArrow'>直线箭头</el-button>
    <el-button type='primary' @click='drawAttackArrow'>攻击箭头</el-button>
    <el-button type='primary' @click='drawPincerArrow'>钳击箭头</el-button>
    <!-- <el-button type='primary' @click='onClear'>清除</el-button> -->
  </operate-box>
</template>
<style scoped lang='less'></style>
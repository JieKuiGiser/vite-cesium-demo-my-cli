<!-- 大雾 -->
<script setup>
import { useStore } from "vuex";
import { onUnmounted } from "vue";
import { Color } from "cesium";
import axios from "axios";
import { Particle3D, Vortex, getFileFields } from "cesium-particle";
const colorTable = [
  [0.015686, 0.054902, 0.847059],
  [0.12549, 0.313725, 1.0],
  [0.254902, 0.588235, 1.0],
  [0.427451, 0.756863, 1.0],
  [0.52549, 0.85098, 1.0],
  [0.611765, 0.933333, 1.0],
  [0.686275, 0.960784, 1.0],
  [0.807843, 1.0, 1.0],
  [1.0, 0.996078, 0.278431],
  [1.0, 0.921569, 0.0],
  [1.0, 0.768627, 0.0],
  [1.0, 0.564706, 0.0],
  [1.0, 0.282353, 0.0],
  [1.0, 0.0, 0.0],
  [0.835294, 0.0, 0.0],
  [0.619608, 0.0, 0.0],
];
axios({
  method: "get",
  url: "http://127.0.0.1:5500/H2010070300.nc",
  responseType: "blob", // 因为我们想要的是blob格式的二进制数据 所以responseType这么设置
}).then(async (ncFile) => {
  var file = ncFile.data;
  // 从NetCDF3文件生成粒子系统对象
  getFileFields(file).then((res) => {
    /*res: {
    variables: ["water_u", "water_v", "depth", "time", "lat", "lon", "time_run"],
    dimensions: ["depth", "time", "lat", "lon"],
    raw: Object
  } */
  });
  const particleObj = new Particle3D(window.$viewer, {
    input: file,
    fields: {
      U: "uu",
      V: "vv",
      lon: "lonout", // 经度
      lat: "latout", // 纬度
    },
    colorTable: colorTable,
  });
  particleObj.init().then((res) => {
    particleObj.show(); // 开始运行粒子系统
  });
});

const store = useStore();

const hide = () => {};
const start = () => {
  particleObj.show();
};
onUnmounted(() => {});
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

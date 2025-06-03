<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import * as Cesium from "cesium";

const store = useStore();
const { viewer } = store.state;

const imageryProvider = new Cesium.UrlTemplateImageryProvider({
  // url: new Cesium.Resource({
  //   url: "http://114.215.136.187:8080/spatio/resource-service/0dc36e39755246baa761228651c03fc1/334/{z}/{x}/{y}.png",
  //   headers: {
  //     Authorization:
  //       "eyJhbGciOiJIUzUxMiJ9.eyJpc19hZG1pbiI6dHJ1ZSwidXNlcl9pZCI6NDMsInVzZXJfa2V5IjoiZWRkYWFlNzctYWRlNi00OGQ2LTlkZWEtZDE4YWQwNjRjYzA2IiwidXNlcm5hbWUiOiJSZW5haXRyZSJ9.wsWT7lmzBXeyDWeqj86aqr09CHx1Y79TXHS3ItqZHUMSoHDtiFZLs_Q8Xc7AePPNz3nvMuDvVDxSImk__mPyvw",
  //   },
  // }),
  url: "http://127.0.0.1:5500/dom/tiles/{z}/{x}/{y}.png",
  // maximumLevel: 14,
  // minimumLevel: 13,
  // rectangle: Cesium.Rectangle.fromDegrees(114.19, 34.22, 123.43, 38.23),
});
// window.$viewer.scene3DOnly = true;
window.$viewer.imageryLayers.addImageryProvider(imageryProvider);
window.$viewer.camera.setView({
  // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  destination: Cesium.Cartesian3.fromDegrees(121.19, 28.89, 40000),
});
</script>
<template>
  <div></div>
</template>
<style lang='less' scoped>
</style>
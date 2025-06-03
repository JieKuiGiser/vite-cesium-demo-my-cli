<script setup>
import { onMounted } from "vue";
import { initViewer } from "@/initCesiumMap.js";
import store from "@/store/store.js";

onMounted(() => {
  init();
});
const init = async () => {
};
</script>

<template>
  <el-container>
    <el-aside>
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-main>
        <div id="cesiumContainer"></div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
#cesiumContainer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.el-header {
  height: 30px;
}

.el-container {
  height: 100vh;
}

.el-main {
  padding: 0 !important;
  position: relative;
}

.el-aside {
  width: auto;
}
</style>

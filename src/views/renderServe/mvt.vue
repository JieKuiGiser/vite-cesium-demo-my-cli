<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import * as Cesium from "cesium";
import MVTImageryProvider from "mvt-imagery-provider";

console.log(PMTiles);

const form = reactive({
  url: "",
  layerName: "",
  srs: "0",
  type: "0",
});
let mvtLayer = null;

import { PMTiles, leafletRasterLayer } from "pmtiles";
// const p = new PMTiles("http://127.0.0.1:5500/xianPoint_convert.pmtiles");

// console.log(p);

const store = useStore();
const { viewer } = store.state;

// https://demotiles.maplibre.org/style.json

// const provider = await MVTImageryProvider.fromUrl(
//   "http://localhost:5001/styles/style.json",
//   {
//     tilingScheme: tilingScheme,
//   }
// );
const renderMvt = (url, layerName, srs) => {
  let tilingScheme;
  if (srs == "0") {
    tilingScheme = new Cesium.WebMercatorTilingScheme();
  } else {
    tilingScheme = new Cesium.GeographicTilingScheme();
  }
  const point = [
    {
      id: "point_circle",
      type: "circle",
      source: "tiles",
      "source-layer": layerName,
      paint: {
        "circle-color": "#4264fb",
        "circle-radius": 5,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    },
    {
      id: "point_text",
      type: "symbol",
      source: "tiles",
      "source-layer": layerName,
      layout: {
        "text-anchor": "bottom",
        "text-field": "{NAME}",
        "text-font": ["Microsoft YaHei Regular"],
        "text-max-width": 8,
        "text-offset": [0, 2],
        "text-size": {
          base: 1.2,
          stops: [
            [7, 14],
            [11, 24],
          ],
        },
        "icon-allow-overlap": true,
        "icon-optional": false,
        "symbol-avoid-edges": true,
      },
      paint: {
        "text-color": "#333",
        "text-halo-color": "rgba(255,255,255,0.8)",
        "text-halo-width": 1.2,
      },
    },
  ];
  const line = [
    {
      id: "line",
      type: "line",
      source: "tiles",
      "source-layer": layerName,
      paint: {
        "line-width": 2,
        "line-pattern": "line01",
      },
    },

    // {
    //   id: "line",
    //   type: "line",
    //   source: "tiles",
    //   "source-layer": layerName,
    //   paint: {
    //     "line-width": 3,
    //     "line-color": "#ffffff",
    //   },
    //   layout: {
    //     "line-cap": "square",
    //     "line-join": "bevel",
    //     visibility: "visible",
    //   },
    // },
    // {
    //   id: "line2",
    //   type: "line",
    //   source: "tiles",
    //   "source-layer": layerName,
    //   paint: {
    //     "line-dasharray": [2.4, 4.8],
    //     "line-width": 3,
    //     "line-color": "#232323",
    //   },
    //   layout: {
    //     "line-cap": "square",
    //     "line-join": "bevel",
    //     visibility: "visible",
    //   },
    // },
  ];
  const fill = [
    {
      id: "fill",
      type: "fill",
      source: "tiles",
      "source-layer": layerName,
      paint: {
        "fill-color": "#d8e8c8",
        "fill-opacity": 0.7,
        "fill-outline-color": "rgba(95, 208, 100, 1)",
      },
    },
  ];
  const imageryProvider = new MVTImageryProvider({
    style: {
      version: 8,
      name: "OSM Bright",
      metadata: {},
      sources: {
        tiles: {
          type: "vector",
          // maxzoom: 14,
          // minzoom: 0,
          tiles: [url],
        },
      },
      sprite: "http://localhost:8888/lib/sprites/spritesheet",
      glyphs: "http://192.168.13.101/fdthreedmap/fonts/{fontstack}/{range}.pbf",
      layers: form.type == "0" ? point : form.type == "1" ? line : fill,
    },

    tilingScheme: tilingScheme,
  });
  mvtLayer = window.$viewer.imageryLayers.addImageryProvider(
    imageryProvider,
    1
  );
};
const clearMvt = () => {
  console.log(window.$viewer.imageryLayers.get(1));

  const delres = window.$viewer.imageryLayers.remove(mvtLayer);

  console.log(delres);
};

const zoomToMvt = () => {
  window.$viewer.flyTo(mvtLayer);
};

// currentLayer.alpha = 1;

window.$viewer.selectedEntityChanged.addEventListener(function (entity) {
  if (entity) {
    if (entity.id != "Loading..." && entity.id != "None") {
      var description = entity.description
        ? entity.description.getValue(Cesium.JulianDate.now())
        : "No description";
      const properties = htmlToJson(description);
      console.log(properties);
    }
  } else {
    console.log("No entity selected");
  }
});

function htmlToJson(htmlString) {
  // 创建一个 DOMParser 来解析 HTML 字符串
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // 找到所有的表格行
  const rows = doc.querySelectorAll("tr");

  // 初始化空的对象来存储键值对
  const jsonResult = {};

  // 遍历所有行
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const key = cells[0].textContent.trim(); // 第一列是键
    const value = cells[1].textContent.trim(); // 第二列是值

    // 将键值对添加到结果中
    jsonResult[key] = isNaN(value) ? value : Number(value); // 如果值是数字，转换为数字
  });
  return jsonResult;
}
// window.$viewer.camera.setView({
//   // 从以度为单位的经度和纬度值返回笛卡尔3位置。
//   destination: Cesium.Cartesian3.fromDegrees(121.19, 28.89, 40000),
// });
</script>
<template>
  <OperateBox>
    <el-form :model="form" label-width="auto">
      <el-form-item label="URL">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="layerName">
        <el-input v-model="form.layerName" />
      </el-form-item>
      <el-form-item label="srs">
        <el-radio-group v-model="form.srs">
          <el-radio label="0">EPSG:3857</el-radio>
          <el-radio label="1">EPSG:4326</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="type">
        <el-radio-group v-model="form.type">
          <el-radio label="0">点</el-radio>
          <el-radio label="1">线</el-radio>
          <el-radio label="2">面</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="renderMvt(form.url, form.layerName, form.srs)"
          >渲染</el-button
        >
        <el-button type="primary" @click="clearMvt">清除</el-button>
        <el-button type="primary" @click="zoomToMvt">缩放至图层</el-button>
      </el-form-item>
    </el-form>
  </OperateBox>
</template>
<style lang="less" scoped>
.mvtMain {
  position: absolute;
  left: 200px;
  top: 20px;
}
</style>

import * as Cesium from "cesium";
import store from './store/index.js'
import config from "@/config.js";
import { ElMessage } from 'element-plus'
console.log(Cesium,'cesium');

Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MGEyYTA0Ni04ODVkLTQ1OTAtOWFhNC02MDUxODU1MGQyYzUiLCJpZCI6MTMyOTA3LCJpYXQiOjE2ODExMDU5NjR9.2pvw9aYzgbfW7KHlDf8KDvl_V1NHF1U7uLzVssM1YjM";

var viewer
var canvas = document.createElement("canvas");
var gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
if (gl instanceof WebGL2RenderingContext) {
  console.log("Using WebGL2");
} else if (gl instanceof WebGLRenderingContext) {
  console.log("Using WebGL1");
} else {
  console.log("WebGL not supported");
}


export async function initViewer(container) {
    return new Promise(async (resovle, reject) => {
        // 设置默认中国范围
        var china = Cesium.Rectangle.fromDegrees(100, 10, 120, 70);
        Cesium.Camera.DEFAULT_VIEW_RECTANGLE = china;
        // var worldTerrain = Cesium.createWorldTerrain({
        //     requestWaterMask: true,
        //     requestVertexNormals: true
        // });
        // 自定义地形数据
        // var terrainLayer = new Cesium.CesiumTerrainProvider({
        //     url: 'http://127.0.0.1:5500/dem/demTiles/',
        //     requestVertexNormals: true, // 请求照明
        //     requestWaterMask: true // 请求水波纹效果
        // })
        viewer = new Cesium.Viewer(container, {
            imageryProvider: undefined,
            // imageryProvider: new Cesium.GridImageryProvider(),
            // imageryProvider: new Cesium.UrlTemplateImageryProvider({
            //     url:
            //         "https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3E4ODg1NTUiLCJhIjoiY2toNDdudTN6MDByNjMzbW84cDA2MWJxMSJ9.ol91y8mStuwyy-URFaq5Uw",
            //     // "http://wapian.flytopmap.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid2FuZ3Rvbmd4dWUiLCJhIjoiY2pzY3E2M2k0MDk3NzN5dDA0Nmtia2h0cCJ9.oP9fEJxOgVzm0dWGvL6tGg",
            //     // "http://127.0.0.1:10086/{z}/{x}/{y}.png",
            //     // "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
            //     // "http://192.168.16.41/global/UTM/{z}/{x}/{y}.jpg",
            //     fileExtension: "png"
            // }),
            // terrainProvider: worldTerrain,

            // imageryProvider:new Cesium.MapboxImageryProvider({
            //     mapId: 'mapbox.satellite',
            //     accessToken: 'pk.eyJ1Ijoic3E4ODg1NTUiLCJhIjoiY2toNDdudTN6MDByNjMzbW84cDA2MWJxMSJ9.ol91y8mStuwyy-URFaq5Uw'
            // }),
            animation: true, //是否显示动画控件
            selectionIndicator: false,
            shouldAnimate: true,
            homeButton: false, //是否显示Home按钮
            fullscreenButton: false, //是否显示全屏按钮
            baseLayerPicker: false, //是否显示图层选择控件
            geocoder: false, //是否显示地名查找控件
            timeline: true, //是否显示时间线控件
            sceneModePicker: false, //是否显示投影方式控件
            navigationHelpButton: false, //是否显示帮助信息控件
            infoBox: false, //是否显示点击要素之后显示的信息
            requestRenderMode: false, //启用请求渲染模式
            scene3DOnly: false, //每个几何实例将只能以3D渲染以节省GPU内存
            sceneMode: 3, //初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
            fullscreenElement: document.body, //全屏时渲染的HTML元素 暂时没发现用处
        });
        viewerOption();
        changeBaseMap('1')
        const isRead = await findViewerRead(viewer);
        if (isRead) {
            console.log(viewer)
            window.$viewer = viewer;
            //缩放到中国范围
            // viewer.camera.flyTo({
            //     destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 10500000),
            //     orientation: {
            //         heading: Cesium.Math.toRadians(348.4202942851978),
            //         pitch: Cesium.Math.toRadians(-89.74026687972041),
            //         roll: Cesium.Math.toRadians(12),
            //     },
            //     complete: function callback() {

            //     },
            // });
            ElMessage({
                message: '地图初始化成功',
                type: 'success',
                duration: 3 * 1000
            })
            resovle(true)
        } else {
            ElMessage({
                message: '地图初始化失败',
                type: 'error',
                duration: 5 * 1000
            })
            reject(false)
        }

    })
}
export function findViewerRead() {
    return new Promise((resovle, reject) => {
        let timer = setInterval(() => {
            console.log(viewer.dataSourceDisplay.ready)
            if (viewer.dataSourceDisplay.ready) {
                clearInterval(timer)
                resovle(true);
            }
        }, 1000)
    })

}
function viewerOption() {
    viewer.scene.globe.enableLighting = true; //是否开启全局光照
    viewer.shadows = true; //是否开启阴影
    viewer.shadowMap.darkness = 0.6; //阴影透明度--越大越透明
    viewer.scene.debugShowFramesPerSecond = false //显示fps
    viewer.scene.moon.show = true //月亮
    viewer.scene.fog.enabled = false //雾
    viewer.scene.sun.show = true //太阳
    viewer.scene.skyBox.show = true //天空盒
    //设置中键放大缩小
    viewer.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.MIDDLE_DRAG, Cesium.CameraEventType.PINCH]
    //设置右键旋转
    viewer.scene.screenSpaceCameraController.tiltEventTypes = [
        Cesium.CameraEventType.RIGHT_DRAG,
        Cesium.CameraEventType.PINCH,

        {
            eventType: Cesium.CameraEventType.RIGHT_DRAG,
            modifier: Cesium.KeyboardEventModifier.CTRL
        },

        {
            eventType: Cesium.CameraEventType.MIDDLE_DRAG,
            modifier: Cesium.KeyboardEventModifier.CTRL
        }
    ]
}
export function changeHeight(height, tileSet) {
    height = Number(height)
    if (isNaN(height)) {
        return
    }
    var cartographic = Cesium.Cartographic.fromCartesian(tileSet.boundingSphere.center)
    var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height)
    var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height)
    var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3())
    tileSet.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
}
export function changeBaseMap(mapStyle) {
    return new Promise((resovle, reject) => {
        const satellite = new Cesium.UrlTemplateImageryProvider({
            url:
                // "https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?access_token=pk.eyJ1Ijoid2FuZ3Rvbmd4dWUiLCJhIjoiY2pzY3E2M2k0MDk3NzN5dDA0Nmtia2h0cCJ9.oP9fEJxOgVzm0dWGvL6tGg",
                // "http://wapian.flytopmap.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid2FuZ3Rvbmd4dWUiLCJhIjoiY2pzY3E2M2k0MDk3NzN5dDA0Nmtia2h0cCJ9.oP9fEJxOgVzm0dWGvL6tGg",
                "http://192.168.13.101/localmap/UTM/{z}/{x}/{y}.jpg",
            fileExtension: "jpg"
        })
        const street = new Cesium.UrlTemplateImageryProvider({
            url:
                // "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                "http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7",
            fileExtension: "png"
        })
        viewer.imageryLayers.removeAll()
        if (mapStyle == '0') {
            viewer.imageryLayers.addImageryProvider(street)
            viewer.scene.morphTo2D(1)
        } else if (mapStyle == '1') {
            viewer.imageryLayers.addImageryProvider(satellite)
            viewer.scene.morphTo3D(1);
            // var worldTerrain = Cesium.createWorldTerrain({
            //     requestWaterMask: true,
            //     requestVertexNormals: true
            // });
            // var terrainLayer = new Cesium.CesiumTerrainProvider({
            //     url: 'http://127.0.0.1:5500/',
            //     requestVertexNormals: true, // 请求照明
            //     requestWaterMask: true // 请求水波纹效果
            // })
            // viewer.terrainProvider = terrainLayer;
        } else {
            viewer.imageryLayers.addImageryProvider(satellite)
            viewer.scene.morphTo2D(1);
        }
        resovle(true);
        setTimeout(() => {
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 10500000),
                orientation: {
                    heading: Cesium.Math.toRadians(348.4202942851978),
                    pitch: Cesium.Math.toRadians(-89.74026687972041),
                    roll: Cesium.Math.toRadians(0),
                },
                complete: function callback() {
                    // 定位完成之后的回调函数
                },
            });
        }, 2000);
    })
}


// 放大
export function zoomIn() {
    // viewer 为 Viewer 对象
    let position = viewer.camera.position;
    let cameraHeight = viewer.scene.globe.ellipsoid.cartesianToCartographic(position).height;
    // 每次缩小 20 倍，参数可改  
    let moveRate = cameraHeight / 10.0;
    viewer.camera.moveForward(moveRate);
}


export function zoomOut() {
    // viewer 为 Viewer 对象
    let position = viewer.camera.position;
    let cameraHeight = viewer.scene.globe.ellipsoid.cartesianToCartographic(position).height;
    // 每次缩小 20 倍，参数可改  
    let moveRate = cameraHeight / 10.0;
    viewer.camera.moveBackward(moveRate);
}
// 复位
export function reset() {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 10500000),
        orientation: {
            heading: Cesium.Math.toRadians(348.4202942851978),
            pitch: Cesium.Math.toRadians(-89.74026687972041),
            roll: Cesium.Math.toRadians(12),
        },
        complete: function callback() {
            // 定位完成之后的回调函数
        },
    });
}
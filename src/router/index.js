import routes from "./router"
import { ElMessage } from "element-plus"
import { initViewer } from "@/initCesiumMap.js"
import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
});

/** 重置路由 */
export function resetRouter() {
    // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
    try {
        router.getRoutes().forEach((route) => {
            const { name, meta } = route
            if (name && meta.roles?.length) {
                router.hasRoute(name) && router.removeRoute(name)
            }
        })
    } catch (error) {
        // 强制刷新浏览器也行，只是交互体验不是很好
        window.location.reload()
    }
}


router.beforeEach(async (to, _from, next) => {
    if(!window.$viewer){
        await initViewer("cesiumContainer");
    }
    next()
})

router.afterEach(() => {
})
export default router
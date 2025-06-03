import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import store from './store/index.js';
import "./asstes/css/public.css"
import 'element-plus/theme-chalk/index.css'

import router from "@/router/index"

// 5. 创建并挂载根实例
const app = createApp(App);
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router);
app.use(store);

// 全局注册icon（后期可优化，按需注册）
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");

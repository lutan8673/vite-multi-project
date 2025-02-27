import { createRouter, createWebHashHistory } from "vue-router";
import login from "@/login.vue";

const routers = [
  {
    path: "/",
    name: "",
    redirect: "/houseLoan",
    component: "<router-view></router-view>"
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { title: "登录" },
  }
];

// 动态加载 folderPath 下的子文件夹中的 .js 文件
const loadRoutesFromFolder = async () => {
  const modules = import.meta.glob('@/router/*/**/*.js');
  const allRoutes = [];

  for (const path in modules) {
    const relativePath = path.match(/\/([^\/]+)\.js$/)[1];

    const moduleRoutes = await modules[path](); // 动态导入模块
    const routes = Array.isArray(moduleRoutes.default)
      ? moduleRoutes.default
      : [moduleRoutes.default];

    routes.forEach((route) => {
      if (!/^\/$/.test(route.path)) {
        allRoutes.push(route);
      }
    });
  }

  return allRoutes;
}

const createAppRouter = async () => {
  const loadedRoutes = await loadRoutesFromFolder();
  routers.push(...loadedRoutes);

  // 创建路由实例
  return createRouter({
    history: createWebHashHistory(),
    routes: routers,
  });
}

const router = await createAppRouter();

export default router;

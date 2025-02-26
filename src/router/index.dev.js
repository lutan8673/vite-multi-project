import { createRouter, createWebHashHistory } from "vue-router";
import login from "@/login.vue";

// 动态加载 folderPath 下的子文件夹中的 .js 文件
async function loadRoutesFromFolder() {
  const modules = import.meta.glob('@/router/*/**/*.js');
  console.log(888888, modules);
  const allRoutes = [];

  for (const path in modules) {
    const relativePath = path.match(/\/([^\/]+)\.js$/)[1];
    const routePath = `/${relativePath.replace(/\//g, '-')}`;

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

const routesPromise = await loadRoutesFromFolder();
console.log(9999999, routesPromise);

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
  },
  ...routesPromise
];

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
});

export default router;

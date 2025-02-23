import { createRouter, createWebHistory } from "vue-router";
import login from "@/login.vue";

const routers = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { title: "登录" },
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

export default router;

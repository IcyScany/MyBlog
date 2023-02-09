import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
  { path: "/login", component: () => import("../views/back/Login.vue") },
  { path: "/detail", component: () => import("../views/front/Detail.vue") },
  { path: "/", component: () => import("../views/front/HomePage.vue") },
  { path: "/type", component: () => import("../views/front/Type.vue") },
  { path: "/search", component: () => import("../views/front/Search.vue") },
  { path: "/about", component: () => import("../views/front/About.vue") },
  { path: "/scany", component: () => import("../views/front/Scany.vue") },

  {
    path: "/dashboard",
    component: () => import("../views/back/Dashboard.vue"),
    children: [
      {
        path: "/dashboard/category",
        component: () => import("../views/back/Category.vue"),
      },
      {
        path: "/dashboard/article",
        component: () => import("../views/back/Article.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router, routes };

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main" },
    component: () => import("@/views/Home.vue"),
  },

  {
    path: "/login",
    name: "Login",
    meta: { layout: "empty" },
    component: () => import("@/views/Login.vue"),
  },

  {
    path: "/categories",
    name: "Categories",
    meta: { layout: "main" },
    component: () => import("@/views/Categories.vue"),
  },

  {
    path: "/detail_record",
    name: "DetailRecord",
    meta: { layout: "main" },
    component: () => import("@/views/DetailRecord.vue"),
  },

  {
    path: "/history",
    name: "History",
    meta: { layout: "main" },
    component: () => import("@/views/History.vue"),
  },

  {
    path: "/planning",
    name: "Planning",
    meta: { layout: "main" },
    component: () => import("@/views/Planning.vue"),
  },

  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "main" },
    component: () => import("@/views/Profile.vue"),
  },

  {
    path: "/record",
    name: "Record",
    meta: { layout: "main" },
    component: () => import("@/views/Record.vue"),
  },

  {
    path: "/registration",
    name: "Registration",
    meta: { layout: "empty" },
    component: () => import("@/views/Registration.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

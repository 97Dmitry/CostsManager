import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import firebase from "firebase/app";
import record from "../store/record";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Home.vue"),
  },

  {
    path: "/registration",
    name: "Registration",
    meta: { layout: "empty" },
    component: () => import("@/views/Registration.vue"),
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
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Categories.vue"),
  },

  {
    path: "/detail/:id",
    name: "DetailRecord",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/DetailRecord.vue"),
  },

  {
    path: "/history",
    name: "History",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/History.vue"),
  },

  {
    path: "/planning",
    name: "Planning",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Planning.vue"),
  },

  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Profile.vue"),
  },

  {
    path: "/record",
    name: "Record",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/Record.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requirAuth = to.matched.some((record) => record.meta.auth);

  if (requirAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;

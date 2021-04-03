import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import { createApp } from "vue";
import messagePlugin from "@/utils/message.plugin.js";
import Loader from "@/components/app/Loader.vue";
import parseDatePlugin from "@/utils/parseDate.plugin";
import tooltipDirective from "@/directives/tooltip.directive";
import "materialize-css/dist/js/materialize.min";
import "./registerServiceWorker";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKER,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDE_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.use(messagePlugin);
    app.use(parseDatePlugin);
    app.component("Loader", Loader);
    app.directive("tooltip", tooltipDirective);
    app.mount("#app");
  }
});

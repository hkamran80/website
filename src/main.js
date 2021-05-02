import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.prototype.$developmentMode = process.env.NODE_ENV === "development";

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");

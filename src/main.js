import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueSVGIcon from "vue-svgicon";

Vue.use(VueSVGIcon);
Vue.config.productionTip = false;

new Vue({
    vuetify,
    render: h => h(App)
}).$mount("#app");

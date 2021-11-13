import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VTooltipPlugin from "v-tooltip";

import "./index.css";
import "v-tooltip/dist/v-tooltip.css";

createApp(App).use(router).use(store).use(VTooltipPlugin).mount("#app");

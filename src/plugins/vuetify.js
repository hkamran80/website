import Vue from "vue";
import Vuetify from "vuetify/lib";

import MediumIcon from "../components/Medium.icon.vue";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#F06292"
            },
            dark: {
                primary: "#C2185B"
            }
        }
    },
    icons: {
        values: {
            medium: {
                component: MediumIcon
            }
        }
    }
});

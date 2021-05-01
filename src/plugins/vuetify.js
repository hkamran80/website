import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import MediumIcon from "@/components/icons/Medium.vue";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#C2185B"
            },
            dark: {
                primary: "#F06292"
            }
        },
        options: {
            customProperties: true
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

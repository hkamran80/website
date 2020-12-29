import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

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
        }
    }
});

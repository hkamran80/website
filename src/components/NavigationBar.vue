<template>
    <v-row id="navigation" no-gutters>
        <v-col align-self="center" justify="center" md="8" cols="12">
            <router-link to="/">
                <h1 color="primary">
                    H. Kamran
                </h1>
            </router-link>
        </v-col>
        <v-col
            align-self="center"
            justify="center"
            md="4"
            cols="12"
            :class="{ 'text-right': !$vuetify.breakpoint.mobile }"
        >
            <router-link
                to="/blog"
                title="Blog"
                aria-label="Blog"
                class="navigation-item"
            >
                Blog
            </router-link>
            <router-link
                to="/creations"
                title="Creations"
                aria-label="Creations"
                class="navigation-item"
            >
                Creations
            </router-link>
            <router-link
                to="/programs"
                title="Quick Programs"
                aria-label="Quick Programs"
                class="navigation-item"
            >
                Quick Programs
            </router-link>

            <v-btn
                icon
                class="navigation-item umami--click--theme-toggle"
                title="Toggle Theme"
                aria-label="Toggle Theme"
                @click="toggle_theme"
            >
                <v-icon color="primary" v-text="mdiThemeLightDark" />
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
import { mdiThemeLightDark } from "@mdi/js";

export default {
    name: "NavigationBar",
    data: function() {
        return { mdiThemeLightDark: mdiThemeLightDark };
    },
    mounted() {
        const theme = localStorage.getItem("dark_theme");
        if (theme) {
            if (theme === "true") {
                this.$vuetify.theme.dark = true;
            } else {
                this.$vuetify.theme.dark = false;
            }
        } else if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            this.$vuetify.theme.dark = true;
            localStorage.setItem(
                "dark_theme",
                this.$vuetify.theme.dark.toString()
            );
        }
    },
    methods: {
        toggle_theme: function() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            localStorage.setItem(
                "dark_theme",
                this.$vuetify.theme.dark.toString()
            );
        }
    }
};
</script>

<style scoped>
#navigation {
    padding: 30px 0;
}

#navigation a {
    font-weight: bold;
    text-decoration: none;
}

#navigation a.navigation-item {
    padding: 0 12px;
}
#navigation a.navigation-item:nth-of-type(1) {
    padding-left: 0;
}

#navigation a.router-link-exact-active {
    color: #e91e63;
}

#navigation button.v-btn {
    margin: 0 10px;
}
</style>

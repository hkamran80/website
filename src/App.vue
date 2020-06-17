<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card>
                            <v-card-title
                                class="headline lighten-2"
                                color="primary"
                                primary-title
                            >
                                H. Kamran
                                <v-spacer />
                                <v-icon>mdi-language-python</v-icon>
                                <v-icon>mdi-language-swift</v-icon>
                                <v-icon>mdi-language-javascript</v-icon>
                            </v-card-title>

                            <v-divider></v-divider>

                            <v-card-text style="padding: 24px;">
                                <p>
                                    I'm H. Kamran. I'm a Python, Swift, and
                                    JavaScript developer.
                                </p>
                                <div>
                                    <b>My Creations</b>
                                    <ul>
                                        <li>
                                            <v-icon>mdi-github</v-icon>
                                            <a
                                                href="https://schedules.unisontech.org"
                                                target="_blank"
                                                >Schedules</a
                                            >: An app for all schedules
                                        </li>
                                        <li>
                                            <a
                                                href="https://buzzloop.unisontech.org"
                                                target="_blank"
                                                >Buzzloop</a
                                            >: Get notifications for changes in
                                            your School Loop account (only
                                            available for students at this time)
                                        </li>
                                    </ul>
                                </div>
                                <p></p>
                                <div>
                                    <b>Planned Creations</b>
                                    <ul>
                                        <li>
                                            iOS and Android apps for Schedules
                                        </li>
                                        <li>
                                            iOS and Android apps for Buzzloop
                                        </li>
                                        <li>Material redesign for Schedules</li>
                                        <li>Material redesign for Buzzloop</li>
                                    </ul>
                                </div>
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <a href="https://github.com/hkamran80">
                                    <v-btn icon>
                                        <v-icon>mdi-github</v-icon>
                                    </v-btn>
                                </a>
                                <v-spacer />
                                <a
                                    href="https://twitter.com/hkamran80"
                                    target="_blank"
                                >
                                    <v-btn icon>
                                        <v-icon>mdi-twitter</v-icon>
                                    </v-btn>
                                </a>
                                <v-spacer />
                                <a
                                    href="https://medium.com/@hkamran80"
                                    target="_blank"
                                >
                                    <v-btn icon>
                                        <svgicon
                                            icon="medium"
                                            width="24"
                                            height="24"
                                        ></svgicon>
                                    </v-btn>
                                </a>
                                <v-spacer />

                                <a
                                    href="https://twitter.com/https://stackoverflow.com/users/7313822/h-kamran"
                                    target="_blank"
                                >
                                    <v-btn icon>
                                        <v-icon>mdi-stack-overflow</v-icon>
                                    </v-btn>
                                </a>
                                <v-spacer />
                                <a
                                    href="https://reprint.unisontech.org"
                                    target="_blank"
                                >
                                    <v-btn icon>
                                        <v-icon>mdi-script-text-outline</v-icon>
                                    </v-btn>
                                </a>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>

                <v-btn
                    fab
                    dark
                    fixed
                    right
                    bottom
                    v-on:click="toggle_dark_mode"
                >
                    <v-icon dark>mdi-theme-light-dark</v-icon>
                </v-btn>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import "./compiled-icons/medium";

export default {
    name: "App",
    methods: {
        toggle_dark_mode: function() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            localStorage.setItem(
                "dark_theme",
                this.$vuetify.theme.dark.toString()
            );
        }
    },
    mounted() {
        const theme = localStorage.getItem("dark_theme");
        if (theme) {
            // deepcode ignore UseStrictEquality: Loaded as a String, not a Boolean
            if (theme == "true") {
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
    }
};
</script>

<style scoped>
div.v-card__title {
    background-color: #185468;
    color: #ffffff;
}
div.v-card__title i.v-icon {
    margin: 0 5px;
    color: #ffffff;
}
div.v-card__actions a {
    text-decoration: none;
}
li i.v-icon {
    margin-right: 5px;
}
</style>

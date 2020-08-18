<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col id="page_container" cols="12" sm="8" md="4">
                        <h1>H. Kamran</h1>
                        <h3>
                            Developer
                            <v-spacer />
                            <v-icon>mdi-language-python</v-icon>
                            <v-icon>mdi-language-swift</v-icon>
                            <v-icon>mdi-language-javascript</v-icon>
                        </h3>
                        <v-divider />
                        <!-- Creations -->
                        <h3>
                            My Creations
                        </h3>
                        <v-spacer />
                        <v-card class="mx-auto" outlined>
                            <v-card-title>
                                Schedules

                                <v-spacer></v-spacer>

                                <a
                                    href="https://github.com/hkamran80/schedules"
                                    title="Schedules GitHub repository"
                                    target="_blank"
                                >
                                    <v-btn icon>
                                        <v-icon>mdi-github</v-icon>
                                    </v-btn>
                                </a>
                                <a
                                    href="https://schedules.unisontech.org"
                                    title="Schedules website"
                                    target="_blank"
                                >
                                    <v-btn icon>
                                        <v-icon>mdi-web</v-icon>
                                    </v-btn>
                                </a>
                            </v-card-title>
                            <v-card-subtitle>Status: Completed</v-card-subtitle>
                            <v-card-text>
                                An app for all schedules, currently supporting
                                Acalanes High School, Campolindo High School,
                                and the AUHSD Distance Learning Schedule.
                            </v-card-text>
                        </v-card>

                        <!-- Creations: In Progress -->
                        <v-card class="mx-auto" outlined>
                            <v-card-title>
                                Remembrance

                                <v-spacer></v-spacer>

                                <a
                                    href="https://github.com/hkamran80/remembrance"
                                    title="Remembrance GitHub repository"
                                    target="_blank"
                                >
                                    <v-btn icon>
                                        <v-icon>mdi-github</v-icon>
                                    </v-btn>
                                </a>
                            </v-card-title>
                            <v-card-subtitle>
                                Status: In Progress
                            </v-card-subtitle>
                            <v-card-text>
                                A read-later bookmark site built with Vue.js and
                                Firebase.
                            </v-card-text>
                        </v-card>
                        <v-card class="mx-auto" outlined>
                            <v-card-title>
                                Lockbook

                                <v-spacer></v-spacer>

                                <v-icon>mdi-help-circle-outline</v-icon>
                                <a
                                    href="https://github.com/hkamran80/lockbook"
                                    title="Lockbook GitHub repository"
                                    target="_blank"
                                >
                                    <v-btn icon>
                                        <v-icon>mdi-github</v-icon>
                                    </v-btn>
                                </a>
                            </v-card-title>
                            <v-card-subtitle>
                                Status: In Progress, Help Needed
                            </v-card-subtitle>
                            <v-card-text>
                                A read-later bookmark site built with Vue.js and
                                Firebase.
                            </v-card-text>
                        </v-card>

                        <v-card class="mx-auto" outlined>
                            <v-card-title>
                                Buzzloop
                                <v-spacer></v-spacer>
                                <v-icon>mdi-puzzle-remove-outline</v-icon>
                            </v-card-title>
                            <v-card-subtitle>Status: Cancelled</v-card-subtitle>
                            <v-card-text>
                                Get notifications for changes in your School
                                Loop account (only available for students at
                                this time)
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <v-speed-dial
                    v-model="fab"
                    fixed
                    right
                    bottom
                    direction="top"
                    transition="slide-y-reverse-transition"
                >
                    <template v-slot:activator>
                        <v-btn v-model="fab" dark fab>
                            <v-icon v-if="fab">mdi-close</v-icon>
                            <v-icon v-else>mdi-menu</v-icon>
                        </v-btn>
                    </template>
                    <v-btn fab dark small @click="toggle_dark_mode">
                        <v-icon>mdi-theme-light-dark</v-icon>
                    </v-btn>
                    <v-btn fab dark small color="teal darken-4">
                        <a
                            href="https://github.com/hkamran80"
                            title="GitHub"
                            target="_blank"
                        >
                            <v-btn icon>
                                <v-icon>mdi-github</v-icon>
                            </v-btn>
                        </a>
                    </v-btn>
                    <v-btn fab dark small color="teal darken-4">
                        <a
                            href="https://twitter.com/hkamran80"
                            title="Twitter"
                            target="_blank"
                        >
                            <v-btn icon>
                                <v-icon>mdi-twitter</v-icon>
                            </v-btn>
                        </a>
                    </v-btn>
                    <v-btn fab dark small color="teal darken-4">
                        <a
                            href="https://medium.com/@hkamran80"
                            title="Medium"
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
                    </v-btn>
                    <v-btn fab dark small color="teal darken-4">
                        <a
                            href="https://reprint.hkamran.com"
                            title="Reprint: A Medium mirror"
                            target="_blank"
                        >
                            <v-btn icon>
                                <v-icon>mdi-script-text-outline</v-icon>
                            </v-btn>
                        </a>
                    </v-btn>
                    <v-btn fab dark small color="teal darken-4">
                        <a
                            href="https://stackoverflow.com/users/7313822/h-kamran"
                            title="StackOverflow"
                            target="_blank"
                        >
                            <v-btn icon>
                                <v-icon>mdi-stack-overflow</v-icon>
                            </v-btn>
                        </a>
                    </v-btn>
                </v-speed-dial>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import "./compiled-icons/medium";

export default {
    name: "App",
    data: () => ({
        fab: false
    }),
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
#page_container {
    padding: 50px 0;
}

div.v-card__title i.v-icon {
    margin: 0 5px;
}
hr {
    margin: 10px 0;
}
h3 i.v-icon {
    margin-right: 7.5px;
}
div.v-card {
    margin: 12.5px auto;
}
</style>

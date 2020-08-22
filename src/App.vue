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
                            <a
                                href="https://github.com/hkamran80?tab=repositories&language=python"
                                title="Python-based GitHub repositories"
                                target="_blank"
                            >
                                <v-btn icon>
                                    <v-icon>mdi-language-python</v-icon>
                                </v-btn>
                            </a>
                            <a
                                href="https://github.com/hkamran80?tab=repositories&language=swift"
                                title="Swift-based GitHub repositories"
                                target="_blank"
                            >
                                <v-btn icon>
                                    <v-icon>mdi-language-swift</v-icon>
                                </v-btn> </a
                            ><a
                                href="https://github.com/hkamran80?tab=repositories&language=javascript"
                                title="JavaScript-based GitHub repositories"
                                target="_blank"
                            >
                                <v-btn icon>
                                    <v-icon>mdi-language-javascript</v-icon>
                                </v-btn>
                            </a>
                        </h3>
                        <v-divider />

                        <v-tabs fixed-tabs v-model="tabs">
                            <v-tab>Creations</v-tab>
                            <v-tab>About Me</v-tab>
                        </v-tabs>

                        <v-divider />

                        <!-- Creations -->
                        <div id="creations" v-if="tabs == 0">
                            <h3>
                                My Creations
                            </h3>
                            <v-spacer />
                            <v-card
                                v-for="creation in creations"
                                :key="creation.name"
                                class="mx-auto"
                                :class="{
                                    status_cancelled: creation.cancelled
                                }"
                                outlined
                            >
                                <v-card-title>
                                    {{ creation.name }}

                                    <v-spacer></v-spacer>

                                    <v-icon v-if="creation.cancelled">
                                        mdi-puzzle-remove-outline
                                    </v-icon>
                                    <v-icon v-if="creation.help">
                                        mdi-help-circle-outline
                                    </v-icon>
                                    <a
                                        v-if="creation.repository != ''"
                                        :href="creation.repository"
                                        :title="creation.name + ' - Repository'"
                                        target="_blank"
                                    >
                                        <v-btn icon>
                                            <v-icon>mdi-github</v-icon>
                                        </v-btn>
                                    </a>
                                    <a
                                        v-if="creation.site != ''"
                                        :href="creation.site"
                                        :title="creation.name + ' - Website'"
                                        target="_blank"
                                    >
                                        <v-btn icon>
                                            <v-icon>mdi-web</v-icon>
                                        </v-btn>
                                    </a>
                                </v-card-title>
                                <v-card-subtitle>
                                    Status: {{ creation.status }}
                                </v-card-subtitle>
                                <v-card-text>
                                    {{ creation.description }}
                                </v-card-text>
                            </v-card>
                        </div>

                        <!-- About Me -->
                        <div id="aboutme" v-if="tabs == 1">
                            <h3>About Me</h3>
                            <v-spacer />

                            <v-card
                                id="aboutme_information"
                                class="mx-auto"
                                outlined
                            >
                                <v-card-title>
                                    Information
                                </v-card-title>
                                <v-card-text>
                                    My name is H. Kamran and I'm a developer. I
                                    program mainly in Python, but I also know
                                    Swift and JavaScript.
                                </v-card-text>
                            </v-card>
                            <v-card
                                id="aboutme_socialmedia"
                                class="mx-auto"
                                outlined
                            >
                                <v-card-title>
                                    Social Media
                                </v-card-title>
                                <v-card-subtitle>
                                    If you need to get in contact with me, email
                                    me at the email on my GitHub profile or
                                    message me on Twitter.
                                </v-card-subtitle>
                                <v-card-text>
                                    <a
                                        v-for="sma in social"
                                        :key="sma.url"
                                        :href="sma.url"
                                        :title="sma.name"
                                        target="_blank"
                                    >
                                        <v-btn icon>
                                            <v-icon
                                                v-if="sma.name != 'Medium'"
                                                v-text="sma.icon"
                                            ></v-icon>
                                            <svgicon
                                                v-if="sma.name == 'Medium'"
                                                icon="medium"
                                                width="24"
                                                height="24"
                                            ></svgicon>
                                        </v-btn>
                                    </a>
                                </v-card-text>
                            </v-card>
                        </div>
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
    data: () => ({
        fab: false,
        tabs: null,
        creations: [
            {
                name: "Schedules",
                repository: "https://github.com/hkamran80/schedules",
                site: "https://schedules.unisontech.org",
                status: "Completed | Redesigning",
                cancelled: false,
                help: false,
                description:
                    "An app for all schedules, currently supporting Acalanes High School, Campolindo High School, and the AUHSD Distance Learning Schedule."
            },
            {
                name: "Userscripts Site",
                repository: "https://github.com/hkamran80/userscripts_site",
                site: "https://userscripts.hkamran.com",
                status: "Completed",
                cancelled: false,
                help: false,
                description: "A place to hold the userscripts I've created."
            },
            {
                name: "Remembrance",
                repository: "https://github.com/hkamran80/remembrance",
                site: "",
                status: "In Progress",
                cancelled: false,
                help: false,
                description:
                    "A read-later bookmark site built with Vue.js and Firebase."
            },
            {
                name: "Lockbook",
                repository: "https://github.com/hkamran80/lockbook",
                site: "",
                status: "In Progress | Help Needed",
                cancelled: false,
                help: true,
                description:
                    "A diary application that enforces security and privacy."
            },
            {
                name: "Buzzloop",
                repository: "",
                site: "https://buzzloop.unisontech.org",
                status: "Cancelled",
                cancelled: true,
                help: false,
                description:
                    "Get notifications for changes in your School Loop account (only available for students at this time)"
            }
        ],
        social: [
            {
                name: "GitHub",
                url: "https://github.com/hkamran80",
                icon: "mdi-github"
            },
            {
                name: "Twitter",
                url: "https://twitter.com/hkamran80",
                icon: "mdi-twitter"
            },
            {
                name: "Medium",
                url: "https://medium.com/@hkamran80",
                icon: ""
            },
            {
                name: "Reprint",
                url: "https://reprint.hkamran.com",
                icon: "mdi-script-text-outline"
            },
            {
                name: "StackOverflow",
                url: "https://stackoverflow.com/users/7313822/h-kamran",
                icon: "mdi-stack-overflow"
            }
        ]
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
    padding: 55px 0;
}

@media only screen and (orientation: portrait) and (max-width: 768px) {
    #page_container {
        padding: 35px 36px;
    }
}

a {
    text-decoration: none;
}

div.v-card__title i.v-icon {
    margin: 0 5px;
}

div.v-card.status_cancelled {
    border-left: 8px solid rgb(255, 0, 0) !important;
}

div#aboutme_socialmedia div.v-card__text {
    text-align: center;
}
div#aboutme_socialmedia button.v-btn {
    margin: 0 15px;
}

hr {
    margin: 10px 0;
}
h3 i.v-icon {
    margin: 7.5px;
}
h3 i.v-icon:nth-of-type(1) {
    margin-left: 0;
}
div.v-card {
    margin: 12.5px auto;
}
</style>

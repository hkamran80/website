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
                            <a
                                href="https://github.com/hkamran80?tab=repositories&language=swift"
                                title="Swift-based GitHub repositories"
                                target="_blank"
                            >
                                <v-btn icon>
                                    <v-icon>mdi-language-swift</v-icon>
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
                        <div id="creations" v-if="tabs === 0">
                            <h3>
                                My Creations
                            </h3>
                            <v-spacer />
                            <div
                                v-for="creation in creations"
                                :key="creation.name"
                            >
                                <v-card
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
                                        <v-btn
                                            icon
                                            v-if="
                                                Object.keys(
                                                    creation.contributors
                                                ).length !== 0
                                            "
                                            @click="
                                                creation.dialogs.contributors = true
                                            "
                                        >
                                            <v-icon>
                                                mdi-account-multiple-outline
                                            </v-icon>
                                        </v-btn>
                                        <a
                                            v-if="creation.repository != ''"
                                            :href="creation.repository"
                                            :title="
                                                creation.name + ' - Repository'
                                            "
                                            target="_blank"
                                        >
                                            <v-btn icon>
                                                <v-icon>mdi-github</v-icon>
                                            </v-btn>
                                        </a>
                                        <a
                                            v-if="creation.site != ''"
                                            :href="creation.site"
                                            :title="
                                                creation.name + ' - Website'
                                            "
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

                                <v-dialog
                                    v-model="creation.dialogs.contributors"
                                    v-if="
                                        Object.keys(creation.contributors)
                                            .length !== 0
                                    "
                                    width="500"
                                >
                                    <v-card>
                                        <v-card-title>
                                            {{ creation.name }}: Contributors
                                        </v-card-title>
                                        <v-card-text>
                                            <v-list>
                                                <v-list-item
                                                    v-for="(collaborator,
                                                    name) in creation.contributors"
                                                    :key="name"
                                                    :three-line="
                                                        collaborator.role
                                                            .length > 56
                                                    "
                                                >
                                                    <v-list-item-content>
                                                        <v-list-item-title
                                                            v-text="name"
                                                        ></v-list-item-title>
                                                        <v-list-item-subtitle
                                                            v-text="
                                                                collaborator.role
                                                            "
                                                        ></v-list-item-subtitle>
                                                    </v-list-item-content>

                                                    <v-list-item-icon
                                                        @click="
                                                            open_link(
                                                                collaborator
                                                                    .link.url,
                                                                creation
                                                            )
                                                        "
                                                        :title="
                                                            collaborator.link
                                                                .url
                                                        "
                                                    >
                                                        <v-btn icon>
                                                            <v-icon
                                                                v-text="
                                                                    collaborator
                                                                        .link
                                                                        .icon
                                                                "
                                                                v-if="
                                                                    collaborator
                                                                        .link
                                                                        .icon !==
                                                                        'icon--medium'
                                                                "
                                                            ></v-icon>

                                                            <svgicon
                                                                v-else
                                                                icon="medium"
                                                                width="24"
                                                                height="24"
                                                            ></svgicon>
                                                        </v-btn>
                                                    </v-list-item-icon>
                                                </v-list-item>
                                            </v-list>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                            </div>
                        </div>

                        <!-- About Me -->
                        <div id="aboutme" v-if="tabs === 1">
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
                                    program mainly in Python. I've been using
                                    JavaScript and Vue.js a lot more these days,
                                    and dabble in SwiftUI.
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
                status: "Completed",
                contributors: {},
                cancelled: false,
                help: false,
                dialogs: {
                    contributors: false
                },
                description:
                    "An app for all schedules, currently supporting the AUHSD Standard and the AUHSD Distance Learning Schedules."
            },
            {
                name: "SupportDocs",
                repository: "https://github.com/aheze/SupportDocs",
                site: "",
                status: "Completed",
                contributors: {
                    "A. Zheng": {
                        role: "Creator (Created the library)",
                        link: {
                            url: "https://aheze.medium.com",
                            icon: "icon--medium"
                        }
                    },
                    "H. Kamran": {
                        role:
                            "Contributor (Created automatic generation code, wrote documentation, configured dark mode)",
                        link: {
                            url: "https://hkamran.com",
                            icon: "mdi-web"
                        }
                    }
                },
                cancelled: false,
                help: false,
                dialogs: {
                    contributors: false
                },
                description:
                    "Generate help centers for your iOS apps, with Markdown! All you need to do is write your documents on GitHub, and install the library in your app. SupportDocs' custom GitHub Action and GitHub Pages will take care of the rest."
            },
            {
                name: "Diario",
                repository: "",
                site: "https://diario.unisontech.org",
                status: "Completed",
                contributors: {},
                cancelled: false,
                help: false,
                dialogs: {
                    contributors: false
                },
                description:
                    "A simple web-based diary application. Write entries in Markdown and store them in the cloud."
            },
            {
                name: "Userscripts Site",
                repository: "https://github.com/hkamran80/userscripts_site",
                site: "https://userscripts.hkamran.com",
                status: "Completed",
                contributors: {},
                cancelled: false,
                help: false,
                dialogs: {
                    contributors: false
                },
                description: "A place to hold the userscripts I've created."
            },
            {
                name: "Remembrance",
                repository: "https://github.com/hkamran80/remembrance",
                site: "",
                status: "In Progress",
                contributors: {},
                cancelled: false,
                help: false,
                dialogs: {
                    contributors: false
                },
                description:
                    "A read-later bookmark site built with Vue.js and Firebase."
            },
            {
                name: "Lockbook",
                repository: "https://github.com/hkamran80/lockbook",
                site: "",
                status: "Paused | Help Needed",
                contributors: {},
                cancelled: false,
                help: true,
                dialogs: {
                    contributors: false
                },
                description:
                    "A diary application that enforces security and privacy"
            },
            {
                name: "Buzzloop",
                repository: "",
                site: "https://buzzloop.unisontech.org",
                status: "Cancelled",
                contributors: {},
                cancelled: true,
                help: false,
                dialogs: {
                    contributors: false
                },
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
        },
        open_link: function(link, creation) {
            creation.dialogs.contributors = false;
            if (link !== "https://hkamran.com") {
                window.open(link, "_blank");
            }
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

<style>
#app {
    font-family: Lato, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

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

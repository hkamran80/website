<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col id="page_container" cols="12" sm="8" md="4">
                        <h1>
                            <v-row dense no-gutters>
                                <v-col>
                                    H. Kamran
                                </v-col>
                                <v-col class="text-align--right">
                                    <v-btn icon @click="toggle_dark_mode">
                                        <v-icon color="primary">
                                            mdi-theme-light-dark
                                        </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </h1>
                        <h3>
                            Developer
                            <v-spacer />
                            <a
                                href="https://github.com/hkamran80?tab=repositories&language=python"
                                title="Python-based GitHub repositories"
                                target="_blank"
                            >
                                <v-btn icon>
                                    <v-icon color="primary"
                                        >mdi-language-python</v-icon
                                    >
                                </v-btn> </a
                            ><a
                                href="https://github.com/hkamran80?tab=repositories&language=javascript"
                                title="JavaScript-based GitHub repositories"
                                target="_blank"
                            >
                                <v-btn icon>
                                    <v-icon color="primary"
                                        >mdi-language-javascript</v-icon
                                    >
                                </v-btn>
                            </a>
                            <a
                                href="https://github.com/hkamran80?tab=repositories&language=vue"
                                title="Vue-based GitHub repositories"
                                target="_blank"
                            >
                                <v-btn icon>
                                    <v-icon color="primary">mdi-vuejs</v-icon>
                                </v-btn>
                            </a>
                            <a
                                href="https://github.com/hkamran80?tab=repositories&language=swift"
                                title="Swift-based GitHub repositories"
                                target="_blank"
                            >
                                <v-btn icon>
                                    <v-icon color="primary"
                                        >mdi-language-swift</v-icon
                                    >
                                </v-btn>
                            </a>
                        </h3>
                        <v-divider />

                        <v-tabs fixed-tabs center-active v-model="tabs">
                            <v-tab>Projects</v-tab>
                            <v-tab>About Me</v-tab>
                            <v-tab>Quick Programs</v-tab>
                        </v-tabs>

                        <v-divider />

                        <!-- Creations -->
                        <div id="creations" v-if="tabs === 0">
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

                                        <v-icon
                                            color="primary"
                                            v-if="creation.cancelled"
                                        >
                                            mdi-puzzle-remove-outline
                                        </v-icon>
                                        <v-icon
                                            color="primary"
                                            v-if="creation.help"
                                        >
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
                                            <v-icon color="primary">
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
                                                <v-icon color="primary"
                                                    >mdi-github</v-icon
                                                >
                                            </v-btn>
                                        </a>
                                        <a
                                            v-if="creation.site != ''"
                                            :href="creation.site"
                                            :title="
                                                creation.name + ' - Website'
                                            "
                                            :target="
                                                creation.site.indexOf(url) > -1
                                                    ? ''
                                                    : '_blank'
                                            "
                                        >
                                            <v-btn icon>
                                                <v-icon color="primary"
                                                    >mdi-web</v-icon
                                                >
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
                                                                color="primary"
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
                                                                class="primary--text"
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
                                    and dabble in Swift and SwiftUI. I write
                                    articles about topics that interest me or
                                    that I feel like are useful to the world on
                                    my blog,
                                    <a
                                        href="https://reprint.hkamran.com"
                                        target="_blank"
                                        title="Reprint"
                                        >Reprint</a
                                    >, and on
                                    <a
                                        href="https://hkamran.medium.com"
                                        target="_blank"
                                        title="Medium"
                                        >Medium</a
                                    >.
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
                                                color="primary"
                                                v-text="sma.icon"
                                            ></v-icon>
                                        </v-btn>
                                    </a>
                                </v-card-text>
                            </v-card>
                        </div>

                        <!-- Quick Programs -->
                        <quick-programs id="quickprograms" v-if="tabs === 2" />
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import QuickPrograms from "./components/QuickPrograms.vue";

export default {
    name: "App",
    components: {
        QuickPrograms
    },
    data: () => ({
        url: window.location.protocol + "//" + window.location.host,
        tabs:
            window.location.pathname === "/quickprograms"
                ? 2
                : window.location.pathname === "/about"
                ? 1
                : 0,
        creations: [
            {
                name: "Control Surface for Spotify",
                repository: "",
                site: "https://spotify-controlsurface.unisontech.org",
                status: "Completed | Active Development",
                contributors: {},
                cancelled: false,
                help: false,
                dialogs: {
                    contributors: false
                },
                description:
                    "Control Surface for Spotify is a utility to allow users to control their Spotify playback without opening the web version of Spotify. It aims to be a simple, easy-to-use application to control playback and view currently playing information. "
            },
            {
                name: "SupportDocs",
                repository: "https://github.com/aheze/SupportDocs",
                site: "",
                status: "Completed | Active Development",
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
                name: "Grade Calculators",
                repository: "",
                site: `${window.location.protocol}//${window.location.host}/quickprograms`,
                status: "Completed",
                contributors: {},
                cancelled: false,
                help: false,
                dialogs: {
                    contributors: false
                },
                description:
                    'Available under the "Quick Programs" tabs! The grade calculators are simple tools to calculate what you need to get on a final in order to get a particular grade or to see what your grade will look like after you\'ve taken the final.'
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
                name: "Reprint",
                repository: "https://github.com/hkamran80/reprint",
                site: "https://beta-reprint.hkamran.com",
                status: "Completed",
                contributors: {},
                cancelled: false,
                help: false,
                dialogs: {
                    contributors: false
                },
                description:
                    "The complete redesign of Reprint, my personal blog. Powered by Vue.js and Vuetify. Now complete!"
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
                url: "https://hkamran.medium.com",
                icon: "$medium"
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

hr {
    margin: 10px 0;
}
h3 i.v-icon {
    margin: 7.5px;
}
div.v-card {
    margin: 12.5px auto;
}

/* Text Styles */
.text-align--right {
    text-align: right;
}
</style>

<style scoped>
div.v-card.status_cancelled {
    border-left: 8px solid rgb(255, 0, 0) !important;
}

div#aboutme_socialmedia div.v-card__text {
    text-align: center;
}
div#aboutme_socialmedia button.v-btn {
    margin: 0 15px;
}
</style>

<template>
    <v-app id="app">
        <v-main>
            <v-container fluid>
                <navigation-bar />
                <router-view />

                <v-snackbar bottom right :value="updateExists" :timeout="-1">
                    An update is available for the website!

                    <template v-slot:action="{ attrs }">
                        <v-btn
                            text
                            color="primary"
                            @click="refreshApp"
                            v-bind="attrs"
                        >
                            Update
                        </v-btn>
                    </template>
                </v-snackbar>
            </v-container>
        </v-main>

        <v-footer padless>
            <v-card flat tile width="100%">
                <v-card-text>
                    All page views and click events are anonymously logged using
                    <a
                        href="https://umami.is"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Umami</a
                    >. If you would like to opt out of being tracked, click
                    <a title="Open privacy dialog" @click="privacyDialog = true"
                        >here</a
                    >.
                </v-card-text>
                <v-divider />
                <v-card-text>
                    Copyright © 2020-{{ new Date().getFullYear() }} H. Kamran.
                    The materials on this on this website may be freely copied
                    and distributed so long as the copyright notice and website
                    are included.
                </v-card-text>
            </v-card>
        </v-footer>

        <v-dialog v-model="privacyDialog" width="750" scrollable>
            <privacy
                @installUmami="installUmami"
                @uninstallUmami="uninstallUmami"
                @close="closeDialog"
            />
        </v-dialog>
    </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import Privacy from "@/components/dialogs/Privacy.vue";
import posts from "@/blog/posts.json";
import categories from "@/blog/categories.json";
import update from "@/mixins/update";
import umami from "@/mixins/umami";

export default {
    name: "App",
    components: {
        NavigationBar,
        Privacy
    },
    mixins: [update, umami],
    data: function() {
        return { privacyDialog: false };
    },
    watch: {
        $route(to) {
            let title = "H. Kamran";
            if (to.name === "Blog") {
                title = "Blog - H. Kamran";
            } else if (to.name === "Post") {
                title = `${posts[to.params.post].title} - H. Kamran`;
            } else if (to.name === "Category") {
                title = `${categories[to.params.category].name} - H. Kamran`;
            } else if (to.name === "Programs") {
                title = "Programs - H. Kamran";
            } else if (to.name === "Creations") {
                title = "Creations - H. Kamran";
            } else if (to.name === "NotFound") {
                let type = "Page";
                let query_path = to.query.path;
                if (query_path.indexOf("posts") !== -1) {
                    type = "Post";
                } else if (query_path.indexOf("category") !== -1) {
                    type = "Category";
                }
                title = `${type} Not Found - H. Kamran`;
            }

            document.title = title;
        }
    },
    methods: {
        closeDialog: function() {
            this.privacyDialog = false;
        }
    }
};
</script>

<style>
#app {
    font-family: Lato, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 15px 45px;
}

/* Global Styles */
.text-wrap--break {
    display: inline-block;
    word-break: break-word;
    word-wrap: break-word;
}
</style>

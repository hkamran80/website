<template>
    <v-app id="app">
        <v-main>
            <v-container fluid>
                <navigation-bar />
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";
import posts from "@/blog/posts.json";
import categories from "@/blog/categories.json";

export default {
    name: "App",
    components: {
        NavigationBar
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

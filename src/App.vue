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

export default {
    name: "App",
    components: {
        NavigationBar
    },
    watch: {
        $route(to) {
            document.title =
                to.name === "Post"
                    ? `${posts[to.params.post].title} - H. Kamran`
                    : "H. Kamran";
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

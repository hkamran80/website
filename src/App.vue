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
export default {
    name: "App",
    components: {
        NavigationBar
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

#nav {
    padding: 30px 0;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>

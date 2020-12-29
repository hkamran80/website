<template>
    <center-layout>
        <header class="pt-7 pb-7">
            <h2>
                Hello world! I'm H. Kamran and I'm a developer.
            </h2>
            <h3 class="icon-bar">
                <a
                    href="https://github.com/hkamran80?tab=repositories&language=python"
                    title="Python-based GitHub repositories"
                    target="_blank"
                    class="icon-bar-icon"
                >
                    <v-btn icon>
                        <v-icon color="primary">mdi-language-python</v-icon>
                    </v-btn> </a
                ><a
                    href="https://github.com/hkamran80?tab=repositories&language=javascript"
                    title="JavaScript-based GitHub repositories"
                    target="_blank"
                    class="icon-bar-icon"
                >
                    <v-btn icon>
                        <v-icon color="primary">mdi-language-javascript</v-icon>
                    </v-btn>
                </a>
                <a
                    href="https://github.com/hkamran80?tab=repositories&language=vue"
                    title="Vue-based GitHub repositories"
                    target="_blank"
                    class="icon-bar-icon"
                >
                    <v-btn icon>
                        <v-icon color="primary">mdi-vuejs</v-icon>
                    </v-btn>
                </a>
                <a
                    href="https://github.com/hkamran80?tab=repositories&language=swift"
                    title="Swift-based GitHub repositories"
                    target="_blank"
                    class="icon-bar-icon"
                >
                    <v-btn icon>
                        <v-icon color="primary">mdi-language-swift</v-icon>
                    </v-btn>
                </a>
            </h3>
        </header>
        <article>
            <p>
                I mostly program in Python, but I've started using (specifically
                Vue.js) more for web apps (instead of my previous Flask +
                HTML/CSS/JS combination). I also dabble in Swift and SwiftUI app
                development, but haven't made any full apps (yet).
            </p>
            <p>
                I write articles on topics that interest me or that I feel are
                useful or important. These articles are available on
                <router-link to="/blog" title="Blog" aria-label="Blog">
                    my blog
                </router-link>
                and on
                <a href="https://hkamran.medium.com" target="_blank"> Medium </a
                >. If you want to see what I've created, pop on over to
                <router-link
                    to="/creations"
                    title="Creations"
                    aria-label="Creations"
                >
                    Creations </router-link
                >. If you want to see the mini-programs I've made, pop on over
                to
                <router-link
                    to="/programs"
                    title="Programs"
                    aria-label="Programs"
                >
                    Programs </router-link
                >.
            </p>
        </article>
    </center-layout>
</template>

<script>
import CenterLayout from "../components/CenterLayout.vue";
export default {
    name: "Home",
    components: {
        CenterLayout
    }
};
</script>

<style scoped>
h3.icon-bar * {
    margin-left: 0;
    padding-right: 8px;
}
</style>

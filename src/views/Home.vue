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
                I mostly program in Python, but I've started using JavaScript
                (specifically Vue.js) more for web apps (instead of my previous
                Flask + HTML/CSS/JS combination). I also dabble in Swift and
                SwiftUI app development, but haven't made any full apps (yet).
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
            <br />
            <h3 class="pb-4">
                Latest Post
            </h3>
            <p class="pb-4">
                <a :href="`/blog/posts/${latest_post_id}`" id="latest-post">
                    <v-row align="center">
                        <v-col md="5" cols="12">
                            <v-img
                                class="align-end"
                                width="100%"
                                :src="latest_post.featured"
                            />
                        </v-col>
                        <v-col>
                            <strong
                                class="primary--text"
                                v-text="latest_post.title"
                            />
                            <br />
                            <span v-text="latest_post.excerpt" />
                            <br />
                            <br />
                            <span v-text="latest_post.publish_date" />
                            <span
                                v-if="
                                    latest_post.update_date !== 'null' &&
                                        latest_post.update_date !== undefined &&
                                        typeof latest_post.update_date ===
                                            'string' &&
                                        latest_post.update_date !== ''
                                "
                                v-text="
                                    ` / ${latest_post.update_date} (Updated)`
                                "
                            />
                            <br />
                            <span v-text="latest_post.reading_time" />
                            <br />
                            <br />
                            <v-chip
                                v-for="category of latest_post.categories"
                                :key="category"
                                class="mr-2"
                                :href="`/blog/category/${category}`"
                                v-text="$options.categories[category].name"
                                label
                            />
                        </v-col>
                    </v-row>
                </a>
            </p>
            <h3 class="pb-4">
                Featured Creations
            </h3>
            <p>
                <v-row align="center" justify="center">
                    <v-col
                        v-for="fc in featured"
                        :key="fc.name"
                        md="4"
                        cols="12"
                    >
                        <creation :creation="fc" />
                    </v-col>
                </v-row>
            </p>
        </article>
    </center-layout>
</template>

<script>
import CenterLayout from "@/components/CenterLayout.vue";
import Creation from "@/components/Creation.vue";

import posts from "@/blog/posts.json";
import categories from "@/blog/categories.json";
import creations from "@/creations.json";

export default {
    name: "Home",
    components: {
        CenterLayout,
        Creation
    },
    data: function() {
        return {
            latest_post_id: null,
            latest_post: {
                featured: null,
                title: null,
                publish_date: null,
                update_date: null,
                excerpt: null,
                reading_time: null
            },
            featured: null
        };
    },
    mounted() {
        this.latest_post_id = Object.keys(posts)[0];
        this.latest_post = posts[this.latest_post_id];
        this.featured = creations.filter(creation => creation.featured);
    },
    categories: categories
};
</script>

<style scoped>
h3.icon-bar * {
    margin-left: 0;
    padding-right: 8px;
}
a#latest-post {
    text-decoration: none;
    color: currentColor;
}
</style>

<template>
    <center-layout>
        <cds-header title="Hello world! I'm H. Kamran and I'm a developer.">
            <template v-slot:icons>
                <v-btn
                    icon
                    href="https://github.com/hkamran80"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    aria-label="GitHub"
                    class="umami-click--social-github"
                >
                    <v-icon color="primary" v-text="mdiGithub" />
                </v-btn>

                <v-btn
                    icon
                    href="https://twitter.com/hkamran80"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                    aria-label="Twitter"
                    class="umami-click--social-twitter"
                >
                    <v-icon color="primary" v-text="mdiTwitter" />
                </v-btn>

                <v-btn
                    icon
                    href="https://stackoverflow.com/users/7313822/h-kamran"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Stack Overflow"
                    aria-label="Stack Overflow"
                    class="umami-click--social-stack-overflow"
                >
                    <v-icon color="primary" v-text="mdiStackOverflow" />
                </v-btn>

                <v-btn
                    icon
                    href="https://hkamran.medium.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Medium"
                    aria-label="Medium"
                    class="umami-click--social-medium"
                >
                    <medium-icon size="1.5x" class="simple-icon" />
                </v-btn>
            </template>
        </cds-header>

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
                <a
                    href="https://hkamran.medium.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Medium </a
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
                <post-card
                    class="umami--click--home-latest-post"
                    :id="id"
                    :featured-image-src="post.featured"
                    :title="post.title"
                    :publishDate="post.publish_date"
                    :updateDate="post.update_date"
                    :readingTime="post.reading_time"
                    :excerpt="post.excerpt"
                    :categories="post.categories"
                />
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
                        <creation
                            :creation="fc"
                            :uniformHeight="
                                $vuetify.breakpoint.mobile ? '' : 300
                            "
                            :bottomMargin="false"
                        />
                    </v-col>
                </v-row>
            </p>
        </article>
    </center-layout>
</template>

<script>
import CenterLayout from "@/components/CenterLayout.vue";
import Creation from "@/components/Creation.vue";
import PostCard from "@/components/blog/PostCard.vue";
import CdsHeader from "@/components/cds/CdsHeader.vue";

import posts from "@/blog/posts.json";
import creations from "@/creations.json";

import { MediumIcon } from "vue-simple-icons";
import { mdiGithub, mdiTwitter, mdiStackOverflow } from "@mdi/js";

export default {
    name: "Home",
    components: {
        CenterLayout,
        Creation,
        PostCard,
        CdsHeader,
        MediumIcon
    },
    data: function() {
        return {
            id: null,
            post: {
                featured: null,
                title: null,
                publish_date: null,
                update_date: null,
                excerpt: null,
                reading_time: null
            },
            featured: null,
            mdiGithub: mdiGithub,
            mdiTwitter: mdiTwitter,
            mdiStackOverflow: mdiStackOverflow
        };
    },
    mounted() {
        this.id = Object.keys(posts)[0];
        this.post = posts[this.id];
        this.featured = creations
            .filter(creation => creation.featured)
            .sort((a, b) => {
                let creationA = a.name.toLowerCase(),
                    creationB = b.name.toLowerCase();

                return creationA < creationB
                    ? -1
                    : creationA > creationB
                    ? 1
                    : 0;
            });
    }
};
</script>

<style>
a {
    text-decoration: none;
}
.simple-icon path {
    fill: var(--v-primary-base);
}
</style>

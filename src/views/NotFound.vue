<template>
    <center-layout>
        <header class="pt-7 pb-7">
            <h2 class="pb-1">{{ nf_type }} Not Found</h2>
            <h3 class="text-wrap--break" v-text="$route.query.path" />
        </header>
        <article>
            <p>
                The {{ nf_type.toLowerCase() }} you were trying to access does
                not exist.
            </p>

            <p>
                Want to check out the
                <router-link to="/blog" title="Blog" aria-label="Blog">
                    blog </router-link
                >? How about the
                <router-link
                    to="/creations"
                    title="Creations"
                    aria-label="Creations"
                >
                    creations
                </router-link>
                page? Ooh ooh, I know! The
                <router-link
                    to="/programs"
                    title="Programs"
                    aria-label="Programs"
                >
                    programs
                </router-link>
                page! No? Then the
                <router-link to="/" title="Home" aria-label="Home">
                    homepage </router-link
                >!
            </p>
        </article>
    </center-layout>
</template>

<script>
import posts from "@/blog/posts.json";
import CenterLayout from "@/components/CenterLayout";

export default {
    name: "NotFound",
    posts: posts,
    components: { CenterLayout },
    data: function() {
        return {
            nf_type: null
        };
    },
    mounted() {
        let query_path = this.$route.query.path;
        if (query_path.indexOf("posts") !== -1) {
            this.nf_type = "Post";
        } else if (query_path.indexOf("category") !== -1) {
            this.nf_type = "Category";
        } else {
            this.nf_type = "Page";
        }
    }
};
</script>

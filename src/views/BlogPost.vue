<script setup lang="ts">
import { ref } from "vue";
import NavigationBar from "../components/NavigationBar.vue";
import PageHeader from "../components/PageHeader.vue";

import blogPosts from "../data/blogPosts.json";

import { initialize } from "../composables/theming";
import marked from "marked";

const { switchTheme, background, headerTextColor } = initialize();

const markdown = ref(null as string | null);
import("../data/posts/extracting-pkgs-on-macos.md").then((data) => {
    console.debug(data);
    console.debug(data.default);
    console.debug(data.plainText);
    console.debug(data.default.plainText);
});
console.debug(markdown.value);

// import { Marky } from "../data/posts/extracting-pkgs-on-macos.md";
// console.debug(Marky);

// import markdown from "../data/posts/extracting-pkgs-on-macos.md"
// console.debug(markdown);
</script>

<template>
    <div :class="[background]">
        <navigation-bar @update-theme="switchTheme" />

        <div class="pt-12 px-8 max-w-7xl mx-auto">
            <page-header
                title="Blog Post"
                :header-text-color="headerTextColor"
                class="mb-4"
            />

            <div
                id="post"
                class="
                    mt-12
                    max-w-lg
                    mx-auto
                    grid
                    gap-5
                    lg:grid-cols-3 lg:max-w-none
                "
                v-html="markdown"
            ></div>
        </div>
    </div>
</template>

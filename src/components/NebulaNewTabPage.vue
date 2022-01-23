<script setup lang="ts">
const downloadLinks = {
    Chrome: "https://github.com/hkamran80/nebula-new-tab#chromium-based-browsers-chrome-brave-etc",
    Firefox: "https://addons.mozilla.org/firefox/addon/nebula-new-tab/",
    "Microsoft Edge":
        "https://microsoftedge.microsoft.com/addons/detail/iagkoeigpdjjchjinnjjjgkanpcmknhj",
};
</script>

<template>
    <div id="download-buttons">
        <a
            v-for="(link, browser) in downloadLinks"
            :key="browser"
            :href="link"
            rel="noopener noreferrer"
            target="_blank"
            v-text="`Install in ${browser}`"
            class="text-pink-700 dark:text-pink-500 hover:text-pink-500 dark:hover:text-pink-700 inline-block pr-4"
        />
    </div>
</template>

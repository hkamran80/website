import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import EnvironmentPlugin from "vite-plugin-environment";
import htmlConfig from "vite-plugin-html-config";

const name = "H. Kamran";
const keywords =
    "hkamran developer python javascript vue vue.js typescript java kotlin swift swiftui photography articles blog";
const description =
    "I'm a developer, experienced in Python, JavaScript, TypeScript, Vue.js, Java, Kotlin, Swift, and SwiftUI. I also enjoy taking photos and writing articles on topics that interest me or seem useful.";
const faviconUrl = "https://hkamran.com/assets/images/profile.png";
const twitterUsername = "@hkamran80";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    blog: [
                        "./src/components/BlogCard.vue",
                        "./src/views/BlogPosts.vue",
                        "./src/views/BlogTag.vue",
                        "./src/views/BlogPost.vue",
                    ],
                    notes: [
                        "./src/components/NoteCard.vue",
                        "./src/views/Notes.vue",
                        "./src/views/NotesTag.vue",
                        "./src/views/Note.vue",
                    ],
                    creationPages: [
                        "./src/views/Creation.vue",
                        "./src/components/AcoustatsPage.vue",
                        "./src/components/NebulaNewTabPage.vue",
                    ],
                    programPages: [
                        "./src/views/Program.vue",
                        "./src/components/InputField.vue",
                        "./src/components/FinalGradeCalculatorProgram.vue",
                        "./src/components/OverallGradeAfterFinalCalculatorProgram.vue",
                    ],
                },
            },
        },
    },
    plugins: [
        htmlConfig({
            metas: [
                { charset: "UTF-8" },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1.0",
                },
                {
                    name: "keywords",
                    content: keywords,
                },
                {
                    name: "description",
                    content: description,
                },
                { name: "robots", content: "index, follow" },

                // Open Graph
                { property: "og:title", content: name },
                {
                    property: "og:image",
                    content: faviconUrl,
                },
                { property: "og:type", content: "website" },
                { property: "og:description", content: description },

                // Twitter Cards
                { name: "twitter:card", content: "summary" },
                { name: "twitter:site", content: twitterUsername },
                { name: "twitter:creator", content: twitterUsername },
                { name: "twitter:title", content: name },
                { name: "twitter:description", content: description },
                {
                    name: "twitter:image",
                    content: faviconUrl,
                },
                {
                    name: "twitter:image:alt",
                    content: "H. Kamran's profile picture",
                },
            ],
            links: [
                {
                    rel: "icon",
                    type: "image/png",
                    href: "/assets/images/favicon.png",
                },
                { rel: "preconnect", href: "https://fonts.googleapis.com/" },
                {
                    rel: "preconnect",
                    href: "https://fonts.gstatic.com",
                    crossorigin: "",
                },
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;700&display=swap",
                },
            ],
            // scripts: [
            //     {
            //         src: "https://cdn.jsdelivr.net/gh/virae/we-stand-with-ukraine@v1.0.1/badge.js",
            //         async: true,
            //     },
            // ],
        }),
        EnvironmentPlugin(["API_URL", "UPLOAD_API_URL", "API_VERSION"]),
        vue(),
    ],
});

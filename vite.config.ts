import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import EnvironmentPlugin from "vite-plugin-environment";
import htmlConfig from "vite-plugin-html-config";

const description =
    "I'm a developer, experienced in Python, JavaScript, TypeScript, Vue.js, Java, Kotlin, Swift, and SwiftUI. I also enjoy taking photos and writing articles on topics that interest me or seem useful.";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        htmlConfig({
            metas: [
                {
                    name: "keywords",
                    content:
                        "hkamran developer python javascript vue vue.js typescript java kotlin swift swiftui photography articles blog",
                },
                {
                    name: "description",
                    content: description,
                },
                { name: "robots", content: "index, follow" },

                // Open Graph
                { property: "og:title", content: "H. Kamran" },
                {
                    property: "og:image",
                    content: "https://hkamran.com/assets/images/profile.png",
                },
                {
                    name: "og:image:alt",
                    content: "H. Kamran's profile picture",
                },
                { property: "og:type", content: "website" },
                { property: "og:description", content: description },

                // Twitter Cards
                { name: "twitter:card", content: "summary" },
                { name: "twitter:site", content: "@hkamran80" },
                { name: "twitter:creator", content: "@hkamran80" },
                { name: "twitter:title", content: "H. Kamran" },
                { name: "twitter:description", content: description },
                {
                    name: "twitter:image",
                    content: "https://hkamran.com/assets/images/profile.png",
                },
                {
                    name: "twitter:image:alt",
                    content: "H. Kamran's profile picture",
                },
            ],
        }),
        vue(),
        EnvironmentPlugin(["API_URL", "UPLOAD_API_URL", "API_VERSION"]),
    ],
});
